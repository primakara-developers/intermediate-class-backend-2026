import express from 'express'
import { authorizeAdmin } from '../middlewares/admin.middleware.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import authRoute from './auth.route.js'
import booksRoute from './books.route.js'
import borrowingsRoute from './borrowings.route.js'
import categoriesRoute from './categories.routes.js'
import profilesRoute from './profiles.routes.js'
import usersRoute from './users.route.js'
import logger from '../configs/logger.config.js'

const router = express.Router()

router.get('/', (req, res) => {
  logger.debug('GET / - Welcome route')
  res.send('Welcome to the API Library')
})

router.use((req, res, next) => {
  logger.debug(
    { method: req.method, path: req.path, ip: req.ip },
    'Incoming request',
  )
  next()
})

router.use('/auth', authRoute)
router.use('/books', authenticateToken, booksRoute)
router.use('/users', authenticateToken, authorizeAdmin, usersRoute)
router.use('/profiles', authenticateToken, authorizeAdmin, profilesRoute)
router.use('/categories', authenticateToken, categoriesRoute)
router.use('/borrowings', authenticateToken, authorizeAdmin, borrowingsRoute)

export default router
