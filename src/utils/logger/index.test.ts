import { logger, LoggerStream } from './index'

test('logger logs', () => {
  logger.info('Info test log')
})

test('logger streams', () => {
  const stream = new LoggerStream()
  stream.write('Stream test log')
})
