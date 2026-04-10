import express from 'express'
import booksRoute from './books.route.js'
import categoriesRoute from './categories.routes.js'
import profilesRoute from './profiles.routes.js'
import usersRoute from './users.route.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the API Library')
})

router.use('/books', booksRoute)
router.use('/users', usersRoute)
router.use('/profiles', profilesRoute)
router.use('/categories', categoriesRoute)

export default router
