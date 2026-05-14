import express from 'express'
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from '../controllers/books.controller.js'
import { authorizeAdmin } from '../middlewares/admin.middleware.js'
import {
  bookValidation,
  updateBookValidation,
} from '../validations/books.validation.js'

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBookById)
router.post('/', authorizeAdmin, bookValidation, createBook)
router.put('/:id', authorizeAdmin, updateBookValidation, updateBook)
router.delete('/:id', authorizeAdmin, deleteBook)

export default router
