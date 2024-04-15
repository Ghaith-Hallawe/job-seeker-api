import { FileValidatorType } from '../types/file.type';
import * as Joi from 'joi';

// Job Get Validator
const GetParamsId: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
});

const GetRequest: Joi.ObjectSchema = Joi.object({
  params: GetParamsId.required(),
});
// End Of Job Get Validator

// Job Create Validator
const CreateBody: Joi.ObjectSchema = Joi.object({
  job_post_id: Joi.number().required(),
  name: Joi.string(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  postal: Joi.string(),
  references: Joi.string(),
  languages: Joi.string(),
  race: Joi.string(),
  gender: Joi.string(),
  disability_status: Joi.string(),
  cover_letter: Joi.string(),
  salary: Joi.string(),
  relocate: Joi.boolean(),
  overtime: Joi.boolean(),
  felony: Joi.boolean(),
  notes: Joi.string(),
});

const CreateRequest: Joi.ObjectSchema = Joi.object({
  body: CreateBody.required(),
});
// End Of create

const FileSchema: FileValidatorType = {
  keyName: 'resumeFile',
  allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
  allowedFileExtensions: ['png', 'jpeg', 'jpg', 'pdf'],
  maxAllowedFileSize: 15,
};

// Update

const UpdateBody: Joi.ObjectSchema = Joi.object({
  job_post_id: Joi.number().required(),
  name: Joi.string(),
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  postal: Joi.string(),
  references: Joi.string(),
  languages: Joi.string(),
  race: Joi.string(),
  gender: Joi.string(),
  disability_status: Joi.string(),
  cover_letter: Joi.string(),
  salary: Joi.string(),
  relocate: Joi.number(),
  overtime: Joi.number(),
  felony: Joi.number(),
  notes: Joi.string(),
});

const UpdateRequest: Joi.ObjectSchema = Joi.object({
  body: UpdateBody.required(),
  params: GetParamsId.required(),
});

export { GetRequest, CreateRequest, FileSchema, UpdateRequest };
