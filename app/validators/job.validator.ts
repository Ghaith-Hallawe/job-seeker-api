import * as Joi from 'joi';

// Job Get Validator
const JobGetParams: Joi.ObjectSchema = Joi.object({
  id: Joi.number().required(),
});

const JobGetRequest: Joi.ObjectSchema = Joi.object({
  params: JobGetParams.required(),
});
// End Of Job Get Validator

// Job Create Validator
const JobCreateBody: Joi.ObjectSchema = Joi.object({
  jh_id: Joi.number().required(),
  title: Joi.string().required(),
  employment_type: Joi.number(),
  minimum_experience: Joi.number(),
  description: Joi.string().required(),
  department: Joi.string(),
  country_id: Joi.number().required(),
  job_status: Joi.number(),
  city: Joi.string(),
  state: Joi.string().allow(''),
  postal_code: Joi.string().allow(''),
  approved_salary_range_minimum: Joi.number(),
  approved_salary_range_maximum: Joi.number(),
  confidential: Joi.boolean(),
  private: Joi.boolean(),
  address: Joi.number(),
  education: Joi.number(),
  college: Joi.number(),
  grade_point_average: Joi.number(),
  cover_letter: Joi.number(),
  references: Joi.number(),
  desired_salary: Joi.number(),
  earliest_start_date: Joi.number(),
  website: Joi.number(),
  relocate: Joi.number()
});

const JobCreateRequest: Joi.ObjectSchema = Joi.object({
  body: JobCreateBody.required(),
});
// End Of Auth Register Validator

export { JobGetRequest, JobCreateRequest };
