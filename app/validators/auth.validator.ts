import * as Joi from 'joi';

// Auth Register Validator
const RegisterBody: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  userType: Joi.alternatives(
    Joi.string().valid('intern'),
    Joi.string().valid('mentor'),
    Joi.string().valid('company'),
    Joi.string().valid('educator'),
  ).required(),
  mobileNumber: Joi.string().min(10).max(10).required(),
});

const RegisterRequest: Joi.ObjectSchema = Joi.object({
  body: RegisterBody.required(),
});
// End Of Auth Register Validator

// Auth login Validator
const LoginBody: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

const LoginRequest: Joi.ObjectSchema = Joi.object({
  body: LoginBody.required(),
});
// End of login Validator

// Auth reset password Validator
const ResetPasswordBody: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
});

const ResetPasswordRequest: Joi.ObjectSchema = Joi.object({
  body: ResetPasswordBody.required(),
});
// End of reset password Validator

// Auth reset password Validator
const SetNewPasswordBody: Joi.ObjectSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
});

const SetNewPasswordRequest: Joi.ObjectSchema = Joi.object({
  body: SetNewPasswordBody.required(),
});
// End of reset password Validator

export {
  RegisterRequest,
  LoginRequest,
  ResetPasswordRequest,
  SetNewPasswordRequest,
};
