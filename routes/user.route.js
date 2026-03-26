import express from 'express'
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router
