import { Request, Response, NextFunction } from "express";
import RequestHandler from "../helpers/request.handler";
import { ObjectSchema } from "joi";
import httpConstants from "../constant/http.constants";

export function checkValidation (schema: ObjectSchema) {

  return function(req: Request, res: Response, next: NextFunction) {
    try {
      const validationResult = schema.unknown(true).validate(req);
      if (validationResult.error){
        RequestHandler.throwError(
          httpConstants.HTTP_BAD_REQUEST, 
          'Validation Error', 
          validationResult.error.message)();
      }
      next();
    } catch (err: unknown) {
      RequestHandler.sendError(req, res, err);  
    }
  };
  
}
