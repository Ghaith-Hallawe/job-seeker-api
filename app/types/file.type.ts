import { Readable } from "stream";

export interface FileType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export interface FileValidatorType {
  keyName: string;
  allowedFileTypes: Array<string>;
  allowedFileExtensions: Array<string>;
  maxAllowedFileSize: number;
}