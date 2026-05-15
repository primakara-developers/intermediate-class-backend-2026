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
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBookById)
router.post('/', authorizeAdmin, upload.single('cover'), bookValidation, createBook)
router.put('/:id', authorizeAdmin, upload.single('cover'), updateBookValidation, updateBook)
router.delete('/:id', authorizeAdmin, deleteBook)

export default router
