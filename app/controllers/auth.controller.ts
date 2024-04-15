import * as TokenService from '../middlewares/auth.middleware';
import RequestHandler from '../helpers/request.handler';
import AuthService from '../services/auth.service';
import httpConstants from '../constant/http.constants';
import messagesConstants from '../constant/messages.constants';
import { Request, Response } from 'express';
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SetNewPasswordRequest,
} from '../types/auth.type';

class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const data: RegisterRequest = req.body;
      const result = await AuthService.register(data);

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_LOGIN,
        httpConstants.HTTP_SUCCESS_OK,
      )(result);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }

  // ---------------------

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginRequest = req.body;
      const credentials = await AuthService.login(data);

      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_LOGIN,
        httpConstants.HTTP_SUCCESS_OK,
      )(credentials);
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  // ---------------------

  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const tokenFromHeader = TokenService.getTokenFromHeader(req);
      const result = await AuthService.refreshToken(tokenFromHeader);
      RequestHandler.sendSuccess(
        res,
        messagesConstants.SUCCESS_REFRESH_TOKEN,
        httpConstants.HTTP_SUCCESS_OK,
      )(result);
    } catch (err) {
      RequestHandler.sendError(req, res, err);
    }
  }
  // ---------------------

  public async logOut(req: Request, res: Response): Promise<void> {
    try {
      RequestHandler.sendSuccess(res, messagesConstants.SUCCESS_LOGOUT, 200)();
    } catch (err) {
      RequestHandler.sendError(req, res, err);
    }
  }
  // ---------------------

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email }: ResetPasswordRequest = req.body;
      await AuthService.resetPassword(email);
      RequestHandler.sendSuccess(
        res,
        messagesConstants.RESET_PASSWORD_SUCCESS,
        httpConstants.HTTP_SUCCESS_OK,
      )();
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
  // ---------------------

  public async setNewPassword(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = req.cookies.id;
      const { password }: SetNewPasswordRequest = req.body;
      await AuthService.setNewPassword({ userId, password });
      RequestHandler.sendSuccess(
        res,
        messagesConstants.SET_NEW_PASSWORD_SUCCESS,
        httpConstants.HTTP_SUCCESS_OK,
      )();
    } catch (error) {
      RequestHandler.sendError(req, res, error);
    }
  }
}

export default new AuthController();
