import prisma from '../configs/database.config.js'
import logger from '../configs/logger.config.js'
import { isBookExist } from './books.controller.js'
import { isUserExist } from './users.controller.js'

export const getAllBorrowings = async (req, res) => {
  try {
    logger.debug('getAllBorrowings: Started')
    // Mengambil semua peminjaman dari database menggunakan Prisma Client
    const borrowings = await prisma.borrowings.findMany({
      include: {
        borrower: { select: { id: true, name: true, email: true } },
        book: true,
      },
    })

    logger.info(
      { count: borrowings.length },
      'Retrieved borrowings from database',
    )
    res.status(200).json({
      success: true,
      message: 'Borrowings retrieved successfully',
      data: borrowings,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve borrowings')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving borrowings',
      error: error.message,
    })
  }
}

export const getBorrowingById = async (req, res) => {
  try {
    // Mendapatkan ID peminjaman yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ borrowingId: id }, 'getBorrowingById: Started')

    const borrowing = await prisma.borrowings.findUnique({
      where: { id: parseInt(id) },
      include: {
        borrower: { select: { id: true, name: true, email: true } },
        book: true,
      },
    })

    // Jika peminjaman tidak ditemukan, kirimkan pesan error
    if (!borrowing) {
      logger.warn({ borrowingId: id }, 'Borrowing not found')
      return res.status(404).json({
        success: false,
        message: `Borrowing with ID: ${id} not found`,
      })
    }

    logger.info({ borrowingId: id }, 'Borrowing retrieved successfully')
    res.status(200).json({
      success: true,
      message: 'Borrowing retrieved successfully',
      data: borrowing,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve borrowing')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving borrowing',
      error: error.message,
    })
  }
}

export const createBorrowing = async (req, res) => {
  try {
    logger.debug({ body: req.body }, 'createBorrowing: Started')
    // Mendapatkan data userId dan bookId dari body request
    const { userId, bookId } = req.body

    // Mengecek apakah user dengan ID yang diberikan ada di database menggunakan fungsi isUserExist
    logger.debug({ userId }, 'Checking if user exists')
    const userExists = await isUserExist(userId)

    if (!userExists) {
      logger.warn({ userId }, 'User not found')
      return res.status(404).json({
        success: false,
        message: `User with ID: ${userId} not found`,
      })
    }

    // Mengecek apakah buku dengan ID yang diberikan ada di database menggunakan fungsi isBookExist
    logger.debug({ bookId }, 'Checking if book exists')
    const bookExists = await isBookExist(bookId)

    if (!bookExists) {
      logger.warn({ bookId }, 'Book not found')
      return res.status(404).json({
        success: false,
        message: `Book with ID: ${bookId} not found`,
      })
    }

    logger.debug({ userId, bookId }, 'Creating borrowing in database')
    const borrowing = await prisma.borrowings.create({
      data: {
        userId: parseInt(userId),
        bookId: parseInt(bookId),
      },
      include: {
        borrower: { select: { id: true, name: true, email: true } },
        book: true,
      },
    })

    // Update ketersediaan buku menjadi false setelah dipinjam
    logger.debug({ bookId }, 'Updating book availability')
    await prisma.books.update({
      where: { id: parseInt(bookId) },
      data: { available: false },
    })

    logger.info(
      { borrowingId: borrowing.id, userId, bookId },
      'Borrowing created successfully',
    )
    res.status(201).json({
      success: true,
      message: 'Borrowing created successfully',
      data: borrowing,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to create borrowing')
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating borrowing',
      error: error.message,
    })
  }
}

export const returnBook = async (req, res) => {
  try {
    // Mendapatkan ID peminjaman yang akan dikembalikan dari parameter URL
    const { id } = req.params
    logger.debug({ borrowingId: id }, 'returnBook: Started')

    // Mencari peminjaman dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ borrowingId: id }, 'Finding borrowing in database')
    const borrowing = await prisma.borrowings.findUnique({
      where: { id: parseInt(id) },
    })

    // Jika peminjaman tidak ditemukan, kirimkan pesan error
    if (!borrowing) {
      logger.warn({ borrowingId: id }, 'Borrowing not found')
      return res.status(404).json({
        success: false,
        message: 'Borrowing not found',
      })
    }

    // Cek apakah buku sudah dikembalikan
    if (borrowing.returned_at) {
      logger.warn({ borrowingId: id }, 'Book already returned')
      return res.status(400).json({
        success: false,
        message: 'Book already returned',
      })
    }

    // Update peminjaman dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ borrowingId: id }, 'Updating borrowing return date')
    const returnedBorrowing = await prisma.borrowings.update({
      where: { id: parseInt(id) },
      data: { returned_at: new Date() },
      include: {
        borrower: { select: { id: true, name: true, email: true } },
        book: true,
      },
    })

    // Update ketersediaan buku menjadi true setelah dikembalikan
    logger.debug(
      { bookId: returnedBorrowing.bookId },
      'Updating book availability',
    )
    await prisma.books.update({
      where: { id: returnedBorrowing.bookId },
      data: { available: true },
    })

    logger.info({ borrowingId: id }, 'Book returned successfully')
    res.status(200).json({
      success: true,
      message: 'Book returned successfully',
      data: returnedBorrowing,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to return book')
    res.status(500).json({
      success: false,
      message: 'An error occurred while returning book',
      error: error.message,
    })
  }
}

export const deleteBorrowing = async (req, res) => {
  try {
    // Mendapatkan ID peminjaman yang akan dihapus dari parameter URL
    const id = parseInt(req.params.id)
    logger.debug({ borrowingId: id }, 'deleteBorrowing: Started')

    // Mencari peminjaman dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ borrowingId: id }, 'Finding borrowing in database')
    const borrowing = await prisma.borrowings.findUnique({
      where: { id: parseInt(id) },
      include: {
        borrower: { select: { id: true, name: true, email: true } },
        book: true,
      },
    })

    // Jika peminjaman tidak ditemukan, kirimkan pesan error
    if (!borrowing) {
      logger.warn({ borrowingId: id }, 'Borrowing not found')
      return res.status(404).json({
        success: false,
        message: 'Borrowing not found',
      })
    }

    // Hapus peminjaman dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ borrowingId: id }, 'Deleting borrowing from database')
    await prisma.borrowings.delete({ where: { id: parseInt(id) } })

    // Update ketersediaan buku menjadi true jika buku belum dikembalikan
    if (!borrowing.returned_at) {
      logger.debug({ bookId: borrowing.bookId }, 'Updating book availability')
      await prisma.books.update({
        where: { id: borrowing.bookId },
        data: { available: true },
      })
    }

    logger.info({ borrowingId: id }, 'Borrowing deleted successfully')
    res.status(200).json({
      success: true,
      message: 'Borrowing deleted successfully',
      data: borrowing,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to delete borrowing')
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting borrowing',
      error: error.message,
    })
  }
}
