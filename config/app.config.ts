import * as dotenv from 'dotenv';
dotenv.config();

export default {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  db: {
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'job_seek',
    password: process.env.DB_PASS || '',
    username: process.env.DB_USER || 'root',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: true
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    saltRounds: process.env.SALT_ROUND || 10,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d' // 2 days
  },
  sumsub: {
    app_token: process.env.SUMSUB_APP_TOKEN,
    secret_key: process.env.SUMSUB_SECRET_KEY,
    base_url: process.env.SUMSUB_BASE_URL
  },
  awsSesClient: {
    awsAccessKey: String(process.env.AWS_ACCESS_KEY),
    awsSecretKey: String(process.env.AWS_SECRET_KEY),
    region: String(process.env.AWS_REGION)
  },
  Email: {
    sender: 'info@jobseek.ai'
  },
  otp: {
    otpLength: Number(process.env.OTP_LENGTH)
  },
  s3Client: {
    awsAccessKey: String(process.env.AWS_S3_ACCESS_KEY),
    awsSecretKey: String(process.env.AWS_S3_SECRET_KEY),
    region: String(process.env.AWS_REGION),
    bucket: String(process.env.AWS_S3_BUCKET)
  }
};
