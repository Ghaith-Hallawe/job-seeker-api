import otpGenerator from 'otp-generator';
import { OtpOptions } from '../types/otp.type';
import config from '../../config/app.config';

const otpLength = Number(config.otp.otpLength);

const otpOptions: OtpOptions = {
  digits: true,
  lowerCaseAlphabets: false,
  specialChars: false,
  upperCaseAlphabets: false,
};

export const generateOTP = () => {
  return otpGenerator.generate(otpLength, otpOptions);
};
