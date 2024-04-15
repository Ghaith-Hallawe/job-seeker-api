import jwt, { Secret } from 'jsonwebtoken';
import * as _ from 'lodash';
import config from '../../config/app.config';
import RequestHandler from '../helpers/request.handler';
import { NextFunction, Request, Response } from 'express';
import httpConstants from '../constant/http.constants';
import messagesConstants from '../constant/messages.constants';
import { ErrorType } from '../types/error.type';
import { TokenPayload } from '../types/auth.type';
import library from '../models/index';

const jwt_secret: string | undefined = config.auth.jwtSecret;

export function getTokenFromHeader(req: Request): string | null {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}
// ---------------------

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (_.isUndefined(req.headers.authorization)) {
      RequestHandler.throwError(
        httpConstants.HTTP_UNAUTHORIZED,
        'Unauthorized',
        messagesConstants.NOT_AUTHORIZED,
      )();
    }
    const Bearer = req.headers.authorization
      ? req.headers.authorization.split(' ')[0]
      : undefined;

    if (!Bearer || Bearer !== 'Bearer') {
      RequestHandler.throwError(
        httpConstants.HTTP_UNAUTHORIZED,
        'Unauthorized',
        messagesConstants.NOT_AUTHORIZED,
      )();
    }

    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : undefined;

    if (!token) {
      RequestHandler.throwError(
        httpConstants.HTTP_UNAUTHORIZED,
        'Unauthorized',
        messagesConstants.NOT_AUTHORIZED,
      )();
    } else {
      const decoded = await new Promise<TokenPayload>((resolve, reject) => {
        jwt.verify(
          token,
          jwt_secret as Secret,
          (err: ErrorType | unknown, decoded: TokenPayload) => {
            if (err) {
              reject(err);
            }
            resolve(decoded);
          },
        );
      });

      const user = await library['Users'].findByPk(decoded.id);

      if (!user) {
        RequestHandler.throwError(
          httpConstants.HTTP_UNAUTHORIZED,
          'Unauthorized',
          'User not found',
        )();
      }

      req.cookies = decoded;
      next();
    }
  } catch (err: ErrorType | unknown) {
    RequestHandler.sendError(req, res, err);
  }
}
// ---------------------

export function checkUserRole(RolesToCheck) {
  return function(req: Request, res: Response, next: NextFunction) {
    return;
  }
}