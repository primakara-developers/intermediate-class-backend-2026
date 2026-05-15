import prisma from '../configs/database.config.js'
import logger from '../configs/logger.config.js'

export const getAllCategories = async (req, res) => {
  try {
    logger.debug('getAllCategories: Started')
    const categories = await prisma.categories.findMany()

    logger.info(
      { count: categories.length },
      'Retrieved categories from database',
    )
    res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categories,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve categories')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving categories',
      error: error.message,
    })
  }
}

export const getAllBooksByCategoryId = async (req, res) => {
  try {
    // Mendapatkan ID kategori yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ categoryId: id }, 'getAllBooksByCategoryId: Started')

    // Mengambil kategori dengan ID yang sesuai dari database menggunakan Prisma Client
    // Beserta dengan data buku-bukunya menggunakan include
    logger.debug({ categoryId: id }, 'Finding category in database')
    const category = await prisma.categories.findUnique({
      where: {
        id: id,
      },
      include: {
        books: true,
      },
    })

    if (!category) {
      logger.warn({ categoryId: id }, 'Category not found')
      return res.status(404).json({
        success: false,
        message: `Category with ID: ${id} not found`,
      })
    }

    logger.info(
      { categoryId: id, bookCount: category.books.length },
      'Retrieved books by category',
    )
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: category.books,
    })
  } catch (error) {
    logger.error(
      { error: error.message },
      'Failed to retrieve books by category',
    )
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving books by category',
      error: error.message,
    })
  }
}

export const getCategoryById = async (req, res) => {
  try {
    // Mendapatkan ID kategori yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ categoryId: id }, 'getCategoryById: Started')

    // Mengambil kategori dengan ID yang sesuai dari database menggunakan Prisma Client
    logger.debug({ categoryId: id }, 'Finding category in database')
    const category = await prisma.categories.findUnique({
      where: {
        id: id,
      },
    })

    // Jika kategori tidak ditemukan, kirimkan pesan error
    if (!category) {
      logger.warn({ categoryId: id }, 'Category not found')
      return res.status(404).json({
        success: false,
        message: `Category with ID: ${id} not found`,
      })
    }

    logger.info({ categoryId: id }, 'Category retrieved successfully')
    res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      data: category,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve category')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving category',
      error: error.message,
    })
  }
}

export const createCategory = async (req, res) => {
  try {
    logger.debug({ body: req.body }, 'createCategory: Started')
    // Mendapatkan data kategori baru dari request body
    const { name } = req.body

    // Menambahkan kategori baru ke database menggunakan Prisma Client
    logger.debug({ name }, 'Creating category in database')
    const category = await prisma.categories.create({
      data: {
        name,
      },
    })

    logger.info(
      { categoryId: category.id, name },
      'Category created successfully',
    )
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to create category')
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating category',
      error: error.message,
    })
  }
}

export const updateCategory = async (req, res) => {
  try {
    // Mendapatkan ID buku yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ categoryId: id, body: req.body }, 'updateCategory: Started')

    // Mendapatkan data kategori yang akan diupdate dari request body
    const { name } = req.body

    // Mencari kategori dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ categoryId: id }, 'Finding category in database')
    const category = await prisma.categories.findUnique({
      where: {
        id: id,
      },
    })

    // Jika kategori tidak ditemukan, kirimkan pesan error
    if (!category) {
      logger.warn({ categoryId: id }, 'Category not found')
      return res.status(404).json({
        success: false,
        message: `Category with ID: ${id} not found`,
      })
    }

    // Mengupdate kategori dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ categoryId: id, name }, 'Updating category')
    await prisma.categories.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    })

    logger.info({ categoryId: id, name }, 'Category updated successfully')
    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to update category')
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating category',
      error: error.message,
    })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    // Mendapatkan ID buku yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ categoryId: id }, 'deleteCategory: Started')

    // Mencari kategori dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ categoryId: id }, 'Finding category in database')
    const category = await prisma.categories.findUnique({
      where: {
        id: id,
      },
    })

    // Jika kategori tidak ditemukan, kirimkan pesan error
    if (!category) {
      logger.warn({ categoryId: id }, 'Category not found')
      return res.status(404).json({
        success: false,
        message: `Category with ID: ${id} not found`,
      })
    }

    // Menghapus kategori dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ categoryId: id }, 'Deleting category from database')
    await prisma.categories.delete({
      where: {
        id: id,
      },
    })

    logger.info({ categoryId: id }, 'Category deleted successfully')
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to delete category')
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting category',
      error: error.message,
    })
  }
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
