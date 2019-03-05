import {
  createLogger,
  Logger,
  LoggerOptions,
  transports,
  format,
} from 'winston'

import { LOGGER_TIMESTAMP_FORMAT } from '../../constants/strings/datetime'
import {
  LOGGER_MAX_FILE_NUM,
  LOGGER_MAX_FILE_SIZE,
} from '../../constants/numbers'

const { combine, timestamp, json, colorize, align, printf } = format

const options: LoggerOptions = {
  exitOnError: false,
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: LOGGER_TIMESTAMP_FORMAT }),
        align(),
        printf(
          ({ timestamp: time, level, message }) =>
            `${time} [${level}]: ${message}`,
        ),
      ),
      handleExceptions: true,
      level: 'debug',
    }),
    new transports.File({
      filename: './logs/all-logs.log',
      format: combine(timestamp({ format: LOGGER_TIMESTAMP_FORMAT }), json()),
      handleExceptions: true,
      level: 'info',
      maxFiles: LOGGER_MAX_FILE_NUM,
      maxsize: LOGGER_MAX_FILE_SIZE,
    }),
  ],
}

export const logger: Logger = createLogger(options)

export class LoggerStream {
  public write(message: string) {
    logger.info(message)
  }
}
