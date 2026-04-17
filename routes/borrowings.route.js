import {
  createBorrowing,
  deleteBorrowing,
  getAllBorrowings,
  getBorrowingById,
  returnBook,
} from '../controllers/borrowings.controller.js'
import express from 'express'

const router = express.Router()

router.get('/', getAllBorrowings)
router.get('/:id', getBorrowingById)
router.post('/', createBorrowing)
router.put('/:id/return', returnBook)
router.delete('/:id', deleteBorrowing)

export default router
