import prisma from '../configs/database.config.js'
import { isCategoryExist } from './categories.controllers.js'

export const getBooks = async (req, res) => {
  // Mengambil semua buku dari database menggunakan Prisma Client
  const books = await prisma.books.findMany()

  res.json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
  })
}

export const getBookById = async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mengambil buku dengan ID yang sesuai dari database menggunakan Prisma Client
  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  })

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (!book) {
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    })
  }

  res.json({
    success: true,
    message: 'Book retrieved successfully',
    data: book,
  })
}

export const createBook = async (req, res) => {
  // Mendapatkan data buku baru dari request body
  const { categoryId, title, author, year } = req.body

  // Mengecek apakah kategori dengan ID yang diberikan ada di database menggunakan fungsi isCategoryExist
  const categoryExists = await isCategoryExist(categoryId)

  if (!categoryExists) {
    return res.json({
      success: false,
      message: `Category with ID: ${categoryId} not found`,
    })
  }

  // Menambahkan buku baru ke database menggunakan Prisma Client
  const book = await prisma.books.create({
    data: {
      categoryId,
      title,
      author,
      year,
    },
  })

  res.json({
    success: true,
    message: 'Book created successfully',
    data: book,
  })
}

export const updateBook = async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mendapatkan data buku yang akan diupdate dari request body
  const { categoryId, title, author, year } = req.body

  // Mencari buku dengan ID yang sesuai di database menggunakan Prisma Client
  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  })

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (!book) {
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    })
  }

  const categoryExists = await isCategoryExist(categoryId)

  if (!categoryExists) {
    return res.json({
      success: false,
      message: `Category with ID: ${categoryId} not found`,
    })
  }

  // Mengupdate buku dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.books.update({
    where: {
      id: id,
    },
    data: {
      categoryId,
      title,
      author,
      year,
    },
  })

  res.json({
    success: true,
    message: 'Book updated successfully',
    data: book,
  })
}

export const deleteBook = async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mencari buku dengan ID yang sesuai di database menggunakan Prisma Client
  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  })

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (!book) {
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    })
  }

  // Menghapus buku dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.books.delete({
    where: {
      id: id,
    },
  })

  res.json({
    success: true,
    message: 'Book deleted successfully',
  })
}

export const isBookExist = async (id) => {
  // Mencari buku dengan ID yang sesuai di database menggunakan Prisma Client
  const book = await prisma.books.findUnique({
    where: {
      id: id,
    },
  })

  return !!book
}
