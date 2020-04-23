const WebSocket = require('ws')
const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'ws-instru' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`.
    // - Write all logs error (and below) to `error.log`.
    //
    /* new transports.File({ filename: 'instru-error.log', level: 'error' }),
    new transports.File({ filename: 'instru-combined.log' }) */
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
})

const wss = new WebSocket.Server({ port: 9000, path: '/instru' })

wss.on('connection', (ws) => {
  ws.on('message', (msgString) => {
    const message = JSON.parse(msgString)
    if (message.type === 'error') {
      logger.log('error', message.content)
    } else {
      logger.log('info', JSON.stringify(message.content))
    }
  })

  ws.send('[WS] connection open')
})
