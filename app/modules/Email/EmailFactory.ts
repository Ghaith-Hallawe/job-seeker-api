import BaseEmail from './BaseEmail';
import { IEmailTemplate } from './Templates/IEmailTemplate';
import SesClient from './clients/SesClient';

class EmailFactory {
  public create(template: IEmailTemplate): BaseEmail {
    return new SesClient(template);
  }
}

export default new EmailFactory();
