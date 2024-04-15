import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import config from '../../config/app.config';

const accessKeyId: string = config.s3Client.awsAccessKey;
const secretAccessKey: string = config.s3Client.awsSecretKey;
const region: string = config.s3Client.region;
const bucket: string = config.s3Client.bucket;

class AwsS3Client {
  private s3Client: S3Client;

  constructor() {

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  }

  public async uploadToS3Bucket(fileBody: Buffer, fileKey: string){
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      Body: fileBody
    });
    try {
      await this.s3Client.send(command);
    } catch (err) {
      return err;
    }
  }
}

export default new AwsS3Client();