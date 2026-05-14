import express from 'express'
import { authorizeAdmin } from '../middlewares/admin.middleware.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import authRoute from './auth.route.js'
import booksRoute from './books.route.js'
import borrowingsRoute from './borrowings.route.js'
import categoriesRoute from './categories.routes.js'
import profilesRoute from './profiles.routes.js'
import usersRoute from './users.route.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the API Library')
})

router.use('/auth', authRoute)
router.use('/books', authenticateToken, booksRoute)
router.use('/users', authenticateToken, authorizeAdmin, usersRoute)
router.use('/profiles', authenticateToken, authorizeAdmin, profilesRoute)
router.use('/categories', authenticateToken, categoriesRoute)
router.use('/borrowings', authenticateToken, authorizeAdmin, borrowingsRoute)

export default router
