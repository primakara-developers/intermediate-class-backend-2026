import prisma from '../configs/database.config.js'

async function main() {
  console.log('Memulai proses seeding...')

  // 1. Bersihkan database (Optional, tapi disarankan agar tidak duplikat saat rerunning)
  // Urutan delete penting karena Foreign Key constraints
  await prisma.borrowings.deleteMany()
  await prisma.books.deleteMany()
  await prisma.categories.deleteMany()
  await prisma.profiles.deleteMany()
  await prisma.users.deleteMany()

  // 2. Seed Users (20 Data)
  const users = []
  for (let i = 1; i <= 20; i++) {
    const user = await prisma.users.create({
      data: {
        name: `User Ke-${i}`,
        email: `user${i}@example.com`,
        password: 'hashed_password_123', // Di dunia nyata, gunakan bcrypt
        role: i === 1 ? 'ADMIN' : 'USER',
      },
    })
    users.push(user)
  }

  // 3. Seed Profiles (1-to-1 dengan Users)
  for (const user of users) {
    await prisma.profiles.create({
      data: {
        userId: user.id,
        address: `Jl. Contoh No. ${user.id}`,
        phone: `081234567${user.id.toString().padStart(2, '0')}`,
      },
    })
  }

  // 4. Seed Categories (15 Data)
  const categories = []
  const categoryNames = [
    'Sains',
    'Teknologi',
    'Fiksi',
    'Sejarah',
    'Biografi',
    'Komik',
    'Hukum',
    'Ekonomi',
    'Seni',
    'Agama',
    'Filsafat',
    'Psikologi',
    'Masak',
    'Travel',
    'Puisi',
  ]

  for (const name of categoryNames) {
    const cat = await prisma.categories.create({
      data: { name },
    })
    categories.push(cat)
  }

  // 5. Seed Books (30 Data)
  const books = []
  for (let i = 1; i <= 30; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)]
    const book = await prisma.books.create({
      data: {
        title: `Judul Buku Masterpiece Vol. ${i}`,
        author: `Penulis Terkenal ${String.fromCharCode(65 + (i % 26))}`,
        year: 2000 + (i % 24),
        categoryId: randomCategory.id,
        available: i % 5 !== 0, // Sisipkan beberapa buku yang tidak tersedia
      },
    })
    books.push(book)
  }

  // 6. Seed Borrowings (25 Data Transaksi)
  for (let i = 0; i < 25; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomBook = books[Math.floor(Math.random() * books.length)]

    await prisma.borrowings.create({
      data: {
        userId: randomUser.id,
        bookId: randomBook.id,
        borrow_date: new Date(2026, 0, i + 1),
        returned_at: i % 3 === 0 ? new Date(2026, 1, i + 1) : null, // Ada yang sudah balik, ada yang belum
      },
    })
  }

  console.log('Seeding selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
