import prisma from '../configs/database.config.js'

export const getUsers = async (req, res) => {
  // Mengambil semua pengguna dari database menggunakan Prisma Client
  const users = await prisma.users.findMany()

  res.json({
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  })
}

export const getUserById = async (req, res) => {
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
}

export const createUser = async (req, res) => {
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
}

export const updateUser = async (req, res) => {
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
}

export const deleteUser = async (req, res) => {
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
}
