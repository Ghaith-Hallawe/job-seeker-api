export interface SenderOptions {
  receiver: string;
  subject: string;
  content: string;
}

export interface IEmail {
  to: string[];
  cc: string[];
  subject: string;
  body: string;
}

export interface ISesEmail {
  Destination: {
    CcAddresses: string[];
    ToAddresses: string[];
  };
  Message: {
    Body: {
      Text: {
        Charset: string;
        Data: string;
      };
    };
    Subject: {
      Charset: string;
      Data: string;
    };
  };
  Source: string;
  ReplyToAddresses: string[];
}
