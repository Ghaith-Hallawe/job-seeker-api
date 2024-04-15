import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import config from '../../../../config/app.config';
import { ISesEmail } from '../../../types/email.type';
import BaseEmail from '../BaseEmail';
import { IEmailTemplate } from '../Templates/IEmailTemplate';

const accessKeyId: string = config.awsSesClient.awsAccessKey;
const secretAccessKey: string = config.awsSesClient.awsSecretKey;
const region: string = config.awsSesClient.region;
const senderEmail: string = config.Email.sender;
class SesClient extends BaseEmail {
  private sesClient: SESClient;

  constructor(template: IEmailTemplate) {
    super(template);

    this.sesClient = new SESClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  }

  public async send() {
    const params: ISesEmail = {
      Destination: {
        CcAddresses: [],
        ToAddresses: [...this.message.to]
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: this.message.body
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: this.message.subject
        }
      },
      Source: String(senderEmail),
      ReplyToAddresses: []
    };

    try {
      await this.sesClient.send(new SendEmailCommand(params));
    } catch (error: unknown) {
      return error;
    }
  }
}
export default SesClient;
