import { format } from 'winston';
import { utilities } from 'nest-winston';
import * as winston from 'winston';

/**
 * Transform function
 */
const transformFunction = format((info) => ({
  ...info,
  service: process.env.title,
  type: info.type ?? 'internal',
}));

/**
 * Logger config
 */
export const winstonLoggerConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        transformFunction(),
        winston.format.logstash(),
      ),
      filename: 'log.txt',
      dirname: 'log',
    }),
  ],
};
