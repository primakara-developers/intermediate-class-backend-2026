import prisma from '../configs/database.config.js'

export const getAllProfiles = async (req, res) => {
  const profiles = await prisma.profiles.findMany()

  res.json({
    success: true,
    message: 'Profiles retrieved successfully',
    data: profiles,
  })
}

export const getProfileById = async (req, res) => {
  // Mendapatkan ID profil yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mengambil profil dengan ID yang sesuai dari database menggunakan Prisma Client
  const profile = await prisma.profiles.findUnique({
    where: {
      id: id,
    },
  })

  // Jika profil tidak ditemukan, kirimkan pesan error
  if (!profile) {
    return res.json({
      success: false,
      message: `Profile with ID: ${id} not found`,
    })
  }

  res.json({
    success: true,
    message: 'Profile retrieved successfully',
    data: profile,
  })
}

export const createProfile = async (req, res) => {
  // Mendapatkan data profil baru dari request body
  const { userId, address, phone } = req.body

  // Menambahkan profil baru ke database menggunakan Prisma Client
  const profile = await prisma.profiles.create({
    data: {
      userId,
      address,
      phone,
    },
  })

  res.json({
    success: true,
    message: 'Profile created successfully',
    data: profile,
  })
}

export const updateProfile = async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mendapatkan data profil yang akan diupdate dari request body
  const { name } = req.body

  // Mencari profil dengan ID yang sesuai di database menggunakan Prisma Client
  const profile = await prisma.profiles.findUnique({
    where: {
      id: id,
    },
  })

  // Jika profil tidak ditemukan, kirimkan pesan error
  if (!profile) {
    return res.json({
      success: false,
      message: `Profile with ID: ${id} not found`,
    })
  }

  // Mengupdate profil dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.profiles.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  })

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: profile,
  })
}

export const deleteProfile = async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)

  // Mencari profil dengan ID yang sesuai di database menggunakan Prisma Client
  const profile = await prisma.profiles.findUnique({
    where: {
      id: id,
    },
  })

  // Jika profil tidak ditemukan, kirimkan pesan error
  if (!profile) {
    return res.json({
      success: false,
      message: `Profile with ID: ${id} not found`,
    })
  }

  // Menghapus profil dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.profiles.delete({
    where: {
      id: id,
    },
  })

  res.json({
    success: true,
    message: 'Profile deleted successfully',
  })
}
