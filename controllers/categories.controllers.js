import prisma from '../configs/database.config.js'

export const getAllCategories = async (req, res) => {
  const categories = await prisma.categories.findMany()

  res.json({
    success: true,
    message: 'Categories retrieved successfully',
    data: categories,
  })
}

export const getAllBooksByCategoryId = async (req, res) => {
  // Mendapatkan ID kategori yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mengambil kategori dengan ID yang sesuai dari database menggunakan Prisma Client
  // Beserta dengan data buku-bukunya menggunakan include
  const category = await prisma.categories.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
    },
  })

  if (!category) {
    return res.json({
      success: false,
      message: `Category with ID: ${id} not found`,
    })
  }

  res.json({
    success: true,
    message: 'Books retrieved successfully',
    data: category.books,
  })
}

export const getCategoryById = async (req, res) => {
  // Mendapatkan ID kategori yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mengambil kategori dengan ID yang sesuai dari database menggunakan Prisma Client
  const category = await prisma.categories.findUnique({
    where: {
      id: id,
    },
  })

  // Jika kategori tidak ditemukan, kirimkan pesan error
  if (!category) {
    return res.json({
      success: false,
      message: `Category with ID: ${id} not found`,
    })
  }

  res.json({
    success: true,
    message: 'Category retrieved successfully',
    data: category,
  })
}

export const createCategory = async (req, res) => {
  // Mendapatkan data kategori baru dari request body
  const { name } = req.body

  // Menambahkan kategori baru ke database menggunakan Prisma Client
  const category = await prisma.categories.create({
    data: {
      name,
    },
  })

  res.json({
    success: true,
    message: 'Category created successfully',
    data: category,
  })
}

export const updateCategory = async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mendapatkan data kategori yang akan diupdate dari request body
  const { name } = req.body

  // Mencari kategori dengan ID yang sesuai di database menggunakan Prisma Client
  const category = await prisma.categories.findUnique({
    where: {
      id: id,
    },
  })

  // Jika kategori tidak ditemukan, kirimkan pesan error
  if (!category) {
    return res.json({
      success: false,
      message: `Category with ID: ${id} not found`,
    })
  }

  // Mengupdate kategori dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.categories.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  })

  res.json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  })
}

export const deleteCategory = async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mencari kategori dengan ID yang sesuai di database menggunakan Prisma Client
  const category = await prisma.categories.findUnique({
    where: {
      id: id,
    },
  })

  // Jika kategori tidak ditemukan, kirimkan pesan error
  if (!category) {
    return res.json({
      success: false,
      message: `Category with ID: ${id} not found`,
    })
  }

  // Menghapus kategori dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.categories.delete({
    where: {
      id: id,
    },
  })

  res.json({
    success: true,
    message: 'Category deleted successfully',
  })
}

export const isCategoryExist = async (id) => {
  // Mencari kategori dengan ID yang sesuai di database menggunakan Prisma Client
  const category = await prisma.categories.findUnique({
    where: {
      id: id,
    },
  })

  return !!category
}
