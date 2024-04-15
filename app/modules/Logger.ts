
import { createLogger, format, transports } from 'winston';
import  fs from 'fs';
import DailyRotate from 'winston-daily-rotate-file';
import config from '../../config/app.config';

const { env } = config.app;
const logDir = 'log';
let infoLogger: any;
let errorLogger: any;
let warnLogger: any;
let allLogger: any;

export default class Logger {
  severity: any;

  constructor() {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    infoLogger = createLogger({
      // change level if in dev environment versus production
      level: env === 'development' ? 'info' : 'debug',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)

      ),
      transports: [
        new transports.Console({
          level: 'info',
          format: format.combine(
            format.colorize(),
            format.printf(
              (info: any) => `${info.timestamp} ${info.level}: ${info.message}`
            )
          )
        }),

        new (DailyRotate)({
          filename: `${logDir}/%DATE%-info-results.log`,
          datePattern: 'YYYY-MM-DD'
        })
      ],
      exitOnError: false
    });

    errorLogger = createLogger({
      // change level if in dev environment versus production
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf((error: any) => `${error.timestamp} ${error.level}: ${error.message}`)

      ),
      transports: [
        new transports.Console({
          level: 'error',
          format: format.combine(
            format.colorize(),
            format.printf(
              (error: any) => `${error.timestamp} ${error.level}: ${error.message}`
            )
          )
        }),

        new (DailyRotate)({
          filename: `${logDir}/%DATE%-errors-results.log`,
          datePattern: 'YYYY-MM-DD'
        })
      ],
      exitOnError: false
    });

    warnLogger = createLogger({
      // change level if in dev environment versus production
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf((warn: any) => `${warn.timestamp} ${warn.level}: ${warn.message}`)

      ),
      transports: [
        new transports.Console({
          level: 'warn',
          format: format.combine(
            format.colorize(),
            format.printf(
              (warn: any) => `${warn.timestamp} ${warn.level}: ${warn.message}`
            )
          )
        }),

        new (DailyRotate)({
          filename: `${logDir}/%DATE%-warnings-results.log`,
          datePattern: 'YYYY-MM-DD'
        })
      ],
      exitOnError: false
    });

    allLogger = createLogger({
      // change level if in dev environment versus production
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf((silly: any) => `${silly.timestamp} ${silly.level}: ${silly.message}`)

      ),
      transports: [
        new (DailyRotate)({
          filename: `${logDir}/%DATE%-results.log`,
          datePattern: 'YYYY-MM-DD'
        })
      ],
      exitOnError: false
    });
  }
  // ---------------------

  public log(message: any, severity: any, data?: any) {
    if (severity == null || infoLogger.levels[severity] == null) {
      this.severity = 'info';
    }
    if (severity === 'info') {
      infoLogger.log(severity, message, data);
      allLogger.log(severity, message, data);
    } else if (severity === 'error') {
      errorLogger.log(severity, message);
      allLogger.log(severity, message, data);
    } else if (severity === 'warn') {
      warnLogger.log(severity, message, data);
      allLogger.log(severity, message, data);
    }
  }
  // ---------------------

}