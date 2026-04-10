import express from 'express'
import {
  createUser,
  deleteUser,
  getUserById,
  getUserByIdWithProfile,
  getUsers,
  updateUser,
} from '../controllers/users.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.get('/:id/profile', getUserByIdWithProfile)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router
