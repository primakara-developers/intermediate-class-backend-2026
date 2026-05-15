import express from 'express'
import router from './routes/index.route.js'
import pinoHttp from 'pino-http'
import logger from './configs/logger.config.js'

const app = express()
const port = 3000

app.use(pinoHttp())
app.use(express.json())
app.use(router)

app.listen(port, () => {
  logger.info(`Library API is running url: http://localhost:${port}`)
})
