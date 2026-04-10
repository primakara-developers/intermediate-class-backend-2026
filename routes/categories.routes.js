import express from 'express'
import {
  createCategory,
  deleteCategory,
  getAllBooksByCategoryId,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categories.controllers.js'

const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id/books', getAllBooksByCategoryId)
router.get('/:id', getCategoryById)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router
