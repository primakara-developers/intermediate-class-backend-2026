import express from 'express'
import {
  createBook,
  getBookById,
  getBooks,
  updateBook,
  deleteBook,
} from '../controllers/books.controller.js'

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBookById)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router
