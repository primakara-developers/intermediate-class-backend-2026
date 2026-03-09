import express from 'express'
import { books } from './data.js'

const app = express()
const port = 3000

// Middleware untuk parsing JSON pada request body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to the API Library')
})

app.get('/books', (req, res) => {
  res.send(books)
})

app.get('/books/:id', (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mencari buku dengan ID yang sesuai
  const book = books.find((book) => book.id === id)

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (!book) {
    res.send(`Book with ID: ${id} not found`)
  }

  res.send(book)
})

app.post('/books', (req, res) => {
  // Mendapatkan data buku baru dari request body
  const { title, author, year } = req.body

  // Membuat ID baru dengan menambahkan 1 pada ID terakhir di array books
  const newId = books.length + 1

  // Membuat objek buku baru dengan ID yang unik
  const newBook = { id: newId, title, author, year }

  // Menambahkan buku baru ke dalam array books
  books.push(newBook)

  res.send('Book created successfully')
})

app.put('/books/:id', (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mendapatkan data buku yang akan diupdate dari request body
  const { title, author, year } = req.body

  // Mencari buku dengan ID yang sesuai
  const bookIndex = books.findIndex((book) => book.id === id)

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (bookIndex === -1) {
    res.send(`Book with ID: ${id} not found`)
    return
  }

  // Mengupdate data buku dengan menggunakan spread operator
  books[bookIndex] = {
    id: books[bookIndex].id,
    title,
    author,
    year,
  }

  res.send(`Book with ID: ${id} updated successfully`)
})

app.delete('/books/:id', (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mencari index buku dengan ID yang sesuai
  const bookIndex = books.findIndex((book) => book.id === id)

  // Jika buku tidak ditemukan, kirimkan pesan error
  if (bookIndex === -1) {
    res.send(`Book with ID: ${id} not found`)
    return
  }

  // Menghapus buku dari array menggunakan splice
  books.splice(bookIndex, 1)

  res.send(`Book with ID: ${id} deleted successfully`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
