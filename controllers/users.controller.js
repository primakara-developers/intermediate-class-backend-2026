import prisma from '../configs/database.config.js'
import logger from '../configs/logger.config.js'

export const getUsers = async (req, res) => {
  try {
    logger.debug('getUsers: Started')
    // Mengambil semua pengguna dari database menggunakan Prisma Client
    const users = await prisma.users.findMany()

    logger.info({ count: users.length }, 'Retrieved users from database')
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve users')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving users',
      error: error.message,
    })
  }
}

export const getUserByIdWithProfile = async (req, res) => {
  try {
    // Mendapatkan ID pengguna yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ userId: id }, 'getUserByIdWithProfile: Started')

    // Mengambil pengguna dengan ID yang sesuai dari database menggunakan Prisma Client
    // Beserta dengan data profilnya menggunakan include
    logger.debug({ userId: id }, 'Finding user in database')
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      include: {
        profiles: true,
      },
    })

    // Jika pengguna tidak ditemukan, kirimkan pesan error
    if (!user) {
      logger.warn({ userId: id }, 'User not found')
      return res.status(404).json({
        success: false,
        message: `User with ID: ${id} not found`,
      })
    }

    logger.info({ userId: id }, 'User retrieved successfully')
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve user')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving user',
      error: error.message,
    })
  }
}

export const getUserById = async (req, res) => {
  try {
    // Mendapatkan ID pengguna yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ userId: id }, 'getUserById: Started')

    // Mengambil pengguna dengan ID yang sesuai dari database menggunakan Prisma Client
    logger.debug({ userId: id }, 'Finding user in database')
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    })

    // Jika pengguna tidak ditemukan, kirimkan pesan error
    if (!user) {
      logger.warn({ userId: id }, 'User not found')
      return res.status(404).json({
        success: false,
        message: `User with ID: ${id} not found`,
      })
    }

    logger.info({ userId: id }, 'User retrieved successfully')
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve user')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving user',
      error: error.message,
    })
  }
}

export const createUser = async (req, res) => {
  try {
    logger.debug({ body: req.body }, 'createUser: Started')
    // Mendapatkan data pengguna baru dari request body
    const { name, email, password, role } = req.body

    // Menambahkan pengguna baru ke database menggunakan Prisma Client
    logger.debug({ name, email, role }, 'Creating user in database')
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
        role,
      },
    })

    logger.info({ userId: user.id, email }, 'User created successfully')
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to create user')
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating user',
      error: error.message,
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    // Mendapatkan ID pengguna yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ userId: id, body: req.body }, 'updateUser: Started')

    // Mendapatkan data pengguna yang akan diupdate dari request body
    const { name, email, password, role } = req.body

    // Mencari pengguna dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ userId: id }, 'Finding user in database')
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    })

    // Jika pengguna tidak ditemukan, kirimkan pesan error
    if (!user) {
      logger.warn({ userId: id }, 'User not found')
      return res.status(404).json({
        success: false,
        message: `User with ID: ${id} not found`,
      })
    }

    // Mengupdate pengguna dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug(
      { userId: id, updates: { name, email, role } },
      'Updating user',
    )
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

    logger.info({ userId: id, email }, 'User updated successfully')
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to update user')
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating user',
      error: error.message,
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    // Mendapatkan ID pengguna yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ userId: id }, 'deleteUser: Started')

    // Mencari pengguna dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ userId: id }, 'Finding user in database')
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    })

    // Jika pengguna tidak ditemukan, kirimkan pesan error
    if (!user) {
      logger.warn({ userId: id }, 'User not found')
      return res.status(404).json({
        success: false,
        message: `User with ID: ${id} not found`,
      })
    }

    // Menghapus pengguna dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ userId: id }, 'Deleting user from database')
    await prisma.users.delete({
      where: {
        id: id,
      },
    })

    logger.info({ userId: id }, 'User deleted successfully')
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to delete user')
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting user',
      error: error.message,
    })
  }
}

export const isUserExist = async (id) => {
  // Mencari pengguna dengan ID yang sesuai di database menggunakan Prisma Client
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  })

  return !!user
}
