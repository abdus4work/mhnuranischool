// logger.js

import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Ensure logs directory exists

const { combine, timestamp, printf, metadata } = format;

const logFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  printf(({ timestamp, level, message, metadata }) => {
    let metaString = '';
    if (metadata && Object.keys(metadata).length > 0) {
      metaString = `\n${JSON.stringify(metadata, null, 2)}`;
    }
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
  })
);

const transportAll = new DailyRotateFile({
  filename: 'logs/%DATE%-all.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const transportError = new DailyRotateFile({
  filename: 'logs/%DATE%-error.log',
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '30d'
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [new transports.Console(), transportAll, transportError]
});

export default logger;
