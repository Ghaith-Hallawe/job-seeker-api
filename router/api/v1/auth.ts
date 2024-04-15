import * as express from 'express';
import AuthController from '../../../app/controllers/auth.controller';
import { verifyToken } from '../../../app/middlewares/auth.middleware';
import { checkValidation } from '../../../app/middlewares/validator.middleware';
import {
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SetNewPasswordRequest
} from '../../../app/validators/auth.validator';
const router = express.Router();

router.post('/register', checkValidation(RegisterRequest), AuthController.register);

router.post('/login', checkValidation(LoginRequest), AuthController.login);

router.post('/refreshToken', verifyToken, AuthController.refreshToken);

router.post('/logout', verifyToken, AuthController.logOut);

router.post('/reset-password', checkValidation(ResetPasswordRequest), verifyToken, AuthController.resetPassword);

router.post('/set-new-password', checkValidation(SetNewPasswordRequest), verifyToken, AuthController.setNewPassword);

export default router;
