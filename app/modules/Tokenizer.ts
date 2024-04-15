import jwt from 'jsonwebtoken';
import appConfig from '../../config/app.config';
import bcrypt from 'bcrypt';

class Tokenizer {
  constructor(private config) {
    this.config = appConfig;
  }

  hashPass(pass: string) {
    return bcrypt.hashSync(pass, Number(appConfig.auth.saltRounds));
  }

  generateAccessToken(payload: object | string) {
    return jwt.sign(payload, this.config.auth.jwtSecret, {
      expiresIn: this.config.auth.jwtExpiresIn,
      algorithm: 'HS512'
    });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, this.config.auth.refreshTokenSecret, {
      expiresIn: this.config.auth.refreshTokenExpiresIn
    });
  }
}

export default new Tokenizer(appConfig);
