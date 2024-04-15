import bcrypt from 'bcrypt';
import * as _ from 'lodash';
import ErrorHandler from '../helpers/request.handler';
import httpConstants from '../constant/http.constants';
import jwt, { JwtPayload } from 'jsonwebtoken';
import messagesConstants from '../constant/messages.constants';
import { LoginRequest, RegisterRequest } from '../types/auth.type';
import library from '../models/index';
import Tokenizer from '../modules/Tokenizer';
import { User } from '../types/user.type';
import { ErrorType } from '../types/error.type';
// import EmailFactory from '../modules/Email/EmailFactory';
// import OtpTemplate from '../modules/Email/Templates/OtpTemplate';

class AuthService {
  private modelName = 'Users';

  public async register(data: RegisterRequest) {
    const userExists = await this.checkUserExists(data.email);

    this.validateUserNotRegistered(userExists);

    const userData: User = {
      ...data,
      user_type: data.userType,
      mobile_number: data.mobileNumber,
      password: Tokenizer.hashPass(data.password),
    };

    const createdUser = await this.createUser(userData);

    this.validateUserCreated(createdUser);
    // EmailFactory.create(OtpTemplate).to(data.email).send();
    return {
      email: data.email,
      name: data.name,
      userType: data.userType,
    };
  }

  public async login(data: LoginRequest) {
    const user = await this.checkUserExists(data.email);

    this.validateUserExists(user);

    await this.comparePasswords(data.password, user.password);

    await this.updateLastLoginDate(user.id);

    const tokenPayload = this.generateTokenPayload(user);
    console.log('tokenPayload---->',tokenPayload);
    const token = Tokenizer.generateAccessToken(tokenPayload);
    const refreshToken = Tokenizer.generateRefreshToken(tokenPayload);

    return {
      token,
      refreshToken,
      user: this.getUserLoginData(user),
    };
  }

  public async refreshToken(tokenFromHeader: string | null) {
    const user: JwtPayload | string | null = jwt.decode(
      tokenFromHeader ? tokenFromHeader : '',
    );
    if (user && typeof user !== 'string') {
      delete user.exp;
    }
    return {
      token: Tokenizer.generateRefreshToken(user),
    };
  }

  public async resetPassword(email: string) {
    // EmailFactory.create(OtpTemplate).to(email).send();
  }

  public async setNewPassword({ userId, password }) {
    const newPassword: string = Tokenizer.hashPass(password);
    await this.updateUserPassword(userId, newPassword);
  }

  private async checkUserExists(email: string) {
    return library[this.modelName].findOne({
      where: { email },
    });
  }

  private validateUserNotRegistered(user: User) {
    if (user) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.ALREADY_REGISTERED,
      )();
    }
  }

  private async createUser(userData: User) {
    return await library[this.modelName]
      .build(userData)
      .save()
      .then(
        ErrorHandler.throwIf(
          (r: ErrorType) => !r,
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'Internal server error',
          messagesConstants.CREATE_WENT_WRONG,
        ),
        ErrorHandler.throwError(
          httpConstants.HTTP_INTERNAL_SERVER_ERROR,
          'sequelize error',
          '',
        ),
      )
      .then((savedResource: Promise<User>) => Promise.resolve(savedResource));
  }

  private validateUserCreated(user: User) {
    if (_.isNull(user)) {
      ErrorHandler.throwError(
        httpConstants.HTTP_UNPROCESSABLE_ENTITY,
        'Unprocessable Entity',
        messagesConstants.UNABLE_TO_PROCESS_INSTRUCTION,
      )();
    }
  }

  private async updateLastLoginDate(userId: number) {
    await library[this.modelName].update(
      { last_login_date: new Date() },
      { where: { id: userId } },
    );
  }

  private validateUserExists(user: User) {
    if (!user) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'bad request',
        messagesConstants.INVALID_EMAIL,
      )();
    }
  }

  private async comparePasswords(password: string, hashedPassword: string) {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      ErrorHandler.throwError(
        httpConstants.HTTP_BAD_REQUEST,
        'incorrect',
        messagesConstants.FAILED_LOGIN,
      )();
    }
  }

  private generateTokenPayload(user) {
    return _.omit(user.dataValues, [
      'createdAt',
      'updatedAt',
      'last_login_date',
      'password',
      'gender',
      'mobile_number',
      'user_image',
    ]);
  }

  private getUserLoginData(user) {
    return _.omit(user.dataValues, ['password']);
  }

  private async updateUserPassword(userId: string, password: string) {
    await library[this.modelName].update(
      { last_login_date: new Date(), password },
      { where: { id: userId } },
    );
  }
}

export default new AuthService();
