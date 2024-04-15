import { Request, Response, NextFunction } from "express";
import RequestHandler from "../helpers/request.handler";
import multer from "multer";
import { FileType, FileValidatorType } from "../types/file.type";
import messagesConstants from "../constant/messages.constants";

export function singleFileUpload ({
  keyName,
  allowedFileTypes,
  allowedFileExtensions,
  maxAllowedFileSize
}: FileValidatorType) {
  
  const upload = multer({
    limits: {
      fileSize: 1024 * 1024 * maxAllowedFileSize 
    }
  }).single(keyName);

  return function(req: Request, res: Response, next: NextFunction) {
    return upload(req, res, function(error){
      if(req.file){
        const fileTypeIsValid = checkFileType(req.file, allowedFileTypes, allowedFileExtensions);
        if(!fileTypeIsValid){
          RequestHandler.sendError(req, res, { message: messagesConstants.INVALID_FILE_TYPE});
        }
        if(fileTypeIsValid && !error){
          next();
        }
      }
      else {
        next();
      }
    });
  };
} 


function checkFileType (
  file: FileType | undefined,
  allowedFileTypes: Array<string>, 
  allowedFileExtensions: Array<string>
) {
  if(file){
    const fileExtension = file.originalname.slice(
      ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2
    );
    if(!allowedFileExtensions.includes(fileExtension) || !allowedFileTypes.includes(file.mimetype)) {
      return false;
    }
    return true;
  }
  return false;
  
}
