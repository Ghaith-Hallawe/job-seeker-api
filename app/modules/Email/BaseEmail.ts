import { IEmail } from '../../types/email.type';
import { IEmailTemplate } from './Templates/IEmailTemplate';

abstract class BaseEmail {
  protected message: IEmail = {
    to: [],
    cc: [],
    subject: this.template.getSubject(),
    body: this.template.getBody(),
  };

  constructor(public template: IEmailTemplate) {}

  public to(address: string): BaseEmail {
    this.message.to.push(address);
    return this;
  }

  public subject(subject: string): BaseEmail {
    this.message.subject = subject;
    return this;
  }

  public body(body: string): BaseEmail {
    this.message.body = body;
    return this;
  }

  public abstract send();
}
export default BaseEmail;
