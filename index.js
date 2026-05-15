import express from 'express'
import router from './routes/index.route.js'
import pinoHttp from 'pino-http'
import logger from './configs/logger.config.js'

logger.info('Initializing Express application')

const app = express()
const port = 3000

logger.debug('Setting up middleware')
app.use(pinoHttp())
app.use(express.json())
logger.debug('Middleware configured')

logger.debug('Setting up routes')
app.use(router)
logger.debug('Routes configured')

app.listen(port, () => {
  logger.info(`Library API is running at http://localhost:${port}`)
  logger.info('Application started successfully')
})
