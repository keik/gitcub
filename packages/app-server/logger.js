// @flow

import winston from 'winston'

/* const logger = winston.createLogger({
 *   level: 'info',
 *   format: winston.format.json(),
 *   transports: [
 *     //
 *     // - Write to all logs with level `info` and below to `combined.log`
 *     // - Write all logs error (and below) to `error.log`.
 *     //
 *     new winston.transports.File({ filename: 'error.log', level: 'error' }),
 *     new winston.transports.File({ filename: 'combined.log' })
 *   ]
 * })
 *
 * //
 * // If we're not in production then log to the `console` with the format:
 * // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 * //
 * if (process.env.NODE_ENV !== 'production') {
 *   logger.add(
 *     new winston.transports.Console({
 *       format: winston.format.simple()
 *     })
 *   )
 * }*/

// TODO log to file
const logger = winston.createLogger()

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true
    })
  )
}

export default logger