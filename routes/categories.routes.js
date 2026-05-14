import express from 'express'
import {
  createCategory,
  deleteCategory,
  getAllBooksByCategoryId,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categories.controllers.js'
import { authorizeAdmin } from '../middlewares/admin.middleware.js'

const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id/books', getAllBooksByCategoryId)
router.get('/:id', getCategoryById)
router.post('/', authorizeAdmin, createCategory)
router.put('/:id', authorizeAdmin, updateCategory)
router.delete('/:id', authorizeAdmin, deleteCategory)

export default router
