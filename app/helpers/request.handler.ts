import * as _ from 'lodash';
import { Request, Response } from 'express';
import { ErrorType } from '../types/error.type';
import Logger from '../modules/Logger';
const logger = new Logger();
class RequestHandler {
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  throwIf(
    fn: any,
    status: number,
    errorType: string,
    errorMessage: string,
  ): any {
    return (result: any) =>
      fn(result) ? this.throwError(status, errorType, errorMessage)() : result;
  }
  // ---------------------

  validateJoi(
    err: any,
    status: number,
    errorType: string,
    errorMessage: string,
  ): any {
    if (err) {
      this.logger.log(`error in validating request : ${errorMessage}`, 'warn');
    }
    return !_.isNull(err)
      ? this.throwError(status, errorType, errorMessage)()
      : '';
  }
  // ---------------------

  throwError(status: number, errorType: string, errorMessage: string): any {
    return (e: ErrorType) => {
      if (!e) e = new Error(errorMessage || 'Default Error');
      e.status = status;
      e.errorType = errorType;
      throw e;
    };
  }
  // ---------------------

  catchError(res: Response, error: ErrorType): any {
    if (!error) error = new Error('Default error');
    res
      .status(error.status ?? 500)
      .json({
        type: 'error',
        message: error.message || 'Unhandled error',
        error,
      });
  }
  // ---------------------

  sendSuccess(res: Response, message: string, status: number): any {
    this.logger.log(
      `a request has been made and processed successfully at: ${new Date()}`,
      'info',
    );
    return (data: any, globalData: any) => {
      if (_.isUndefined(status)) {
        status = 200;
      }
      res.status(status).json({
        type: 'success',
        message: message || 'Success result',
        data,
        ...globalData,
      });
    };
  }
  // ---------------------

  sendError(req: Request, res: Response, error: any): any {
    this.logger.log(
      `error ,Error during processing request: ${`${req.protocol}://${req.hostname}${req.originalUrl}`} details message: ${
        error.message
      }`,
      'error'
    );
    return res.status(error.status || 500).json({
      type: 'error',
      message: error.message || error.message || 'Unhandled Error',
      error: { ..._.omit(error,["status"]) }
    });
  }
  // ---------------------

  

}
export default new RequestHandler(logger);
