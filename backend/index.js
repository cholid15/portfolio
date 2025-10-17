import express from 'express'
import cors from 'cors'
import contactRoute from './routes/contact.js'
import logger from './config/logger.js'
import dotenv from 'dotenv'

dotenv.config() // ← pastikan ini ada

const app = express()

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use((req, res, next) => {
  logger.info(
    `[Request] ${req.method} ${req.path} - Body: ${JSON.stringify(req.body)}`
  )
  next()
})

app.use('/api', contactRoute)

const PORT = 5000
app.listen(PORT, () =>
  logger.info(`✅ Server running on http://localhost:${PORT}`)
)
