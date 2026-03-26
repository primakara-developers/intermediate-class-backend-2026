import express from 'express'
import prisma from './database.js'

const app = express()
const port = 3000

// Middleware untuk parsing JSON pada request body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to the API Library')
})

app.get('/books', async (req, res) => {
  // Mengambil semua buku dari database menggunakan Prisma Client
  const books = await prisma.books.findMany()

  res.json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
  })
})

app.get('/books/:id', async (req, res) => {
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
})

app.post('/books', async (req, res) => {
  // Mendapatkan data buku baru dari request body
  const { title, author, year } = req.body

  // Menambahkan buku baru ke database menggunakan Prisma Client
  const book = await prisma.books.create({
    data: {
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
})

app.put('/books/:id', async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mendapatkan data buku yang akan diupdate dari request body
  const { title, author, year } = req.body

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

  // Mengupdate buku dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.books.update({
    where: {
      id: id,
    },
    data: {
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
})

app.delete('/books/:id', async (req, res) => {
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
})

app.get('/users', async (req, res) => {
  // Mengambil semua pengguna dari database menggunakan Prisma Client
  const users = await prisma.users.findMany()

  res.json({
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  })
})

app.get('/users/:id', async (req, res) => {
  // Mendapatkan ID pengguna yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mengambil pengguna dengan ID yang sesuai dari database menggunakan Prisma Client
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  })

  // Jika pengguna tidak ditemukan, kirimkan pesan error
  if (!user) {
    res.json({
      success: false,
      message: `User with ID: ${id} not found`,
    })
    return
  }

  res.json({
    success: true,
    message: 'User retrieved successfully',
    data: user,
  })
})

app.post('/users', async (req, res) => {
  // Mendapatkan data pengguna baru dari request body
  const { name, email, password, role } = req.body

  // Menambahkan pengguna baru ke database menggunakan Prisma Client
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password,
      role,
    },
  })

  res.json({
    success: true,
    message: 'User created successfully',
    data: user,
  })
})

app.put('/users/:id', async (req, res) => {
  // Mendapatkan ID pengguna yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mendapatkan data pengguna yang akan diupdate dari request body
  const { name, email, password, role } = req.body

  // Mencari pengguna dengan ID yang sesuai di database menggunakan Prisma Client
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  })

  // Jika pengguna tidak ditemukan, kirimkan pesan error
  if (!user) {
    res.json({
      success: false,
      message: `User with ID: ${id} not found`,
    })
    return
  }

  // Mengupdate pengguna dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      password,
      role,
    },
  })

  res.json({
    success: true,
    message: 'User updated successfully',
    data: user,
  })
})

app.delete('/users/:id', async (req, res) => {
  // Mendapatkan ID pengguna yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mencari pengguna dengan ID yang sesuai di database menggunakan Prisma Client
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  })

  // Jika pengguna tidak ditemukan, kirimkan pesan error
  if (!user) {
    res.json({
      success: false,
      message: `User with ID: ${id} not found`,
    })
    return
  }

  // Menghapus pengguna dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.users.delete({
    where: {
      id: id,
    },
  })

  res.json({
    success: true,
    message: 'User deleted successfully',
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
