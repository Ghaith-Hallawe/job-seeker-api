import emailConstants from '../../../constant/email.constants';
import { IEmailTemplate } from './IEmailTemplate';
import { generateOTP } from '../../../helpers';

class OtpTemplate implements IEmailTemplate {
  public getBody() {
    return `${emailConstants.OTP_VERIFICATION.content} ${generateOTP}`;
  }

  public getSubject() {
    return emailConstants.OTP_VERIFICATION.subject;
  }
}

export default new OtpTemplate();
