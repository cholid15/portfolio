import { createLogger, format, transports } from 'winston'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// pastikan folder logs ada dengan error handling
const logDir = join(__dirname, '../logs')
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
    console.log(`✅ Logs directory created: ${logDir}`)
  }
} catch (err) {
  console.error(`❌ Failed to create logs directory: ${err.message}`)
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}${
          info.stack ? '\n' + info.stack : ''
        }`
    )
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} [${info.level}]: ${info.message}`
        )
      ),
    }),
    new transports.File({
      filename: join(logDir, 'app.log'),
      level: 'info',
      handleExceptions: true,
    }),
    new transports.File({
      filename: join(logDir, 'error.log'),
      level: 'error',
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
})

// Fallback jika winston gagal
logger.on('error', (err) => {
  console.error('❌ Logger error:', err)
})

export default logger
