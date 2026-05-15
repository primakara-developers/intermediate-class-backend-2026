import prisma from '../configs/database.config.js'
import logger from '../configs/logger.config.js'

export const getAllProfiles = async (req, res) => {
  try {
    logger.debug('getAllProfiles: Started')
    const profiles = await prisma.profiles.findMany()

    logger.info({ count: profiles.length }, 'Retrieved profiles from database')
    res.status(200).json({
      success: true,
      message: 'Profiles retrieved successfully',
      data: profiles,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve profiles')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving profiles',
      error: error.message,
    })
  }
}

export const getProfileById = async (req, res) => {
  try {
    // Mendapatkan ID profil yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ profileId: id }, 'getProfileById: Started')

    // Mengambil profil dengan ID yang sesuai dari database menggunakan Prisma Client
    logger.debug({ profileId: id }, 'Finding profile in database')
    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    })

    // Jika profil tidak ditemukan, kirimkan pesan error
    if (!profile) {
      logger.warn({ profileId: id }, 'Profile not found')
      return res.status(404).json({
        success: false,
        message: `Profile with ID: ${id} not found`,
      })
    }

    logger.info({ profileId: id }, 'Profile retrieved successfully')
    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: profile,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to retrieve profile')
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving profile',
      error: error.message,
    })
  }
}

export const createProfile = async (req, res) => {
  try {
    logger.debug({ body: req.body }, 'createProfile: Started')
    // Mendapatkan data profil baru dari request body
    const { userId, address, phone } = req.body

    // Menambahkan profil baru ke database menggunakan Prisma Client
    logger.debug({ userId, address, phone }, 'Creating profile in database')
    const profile = await prisma.profiles.create({
      data: {
        userId,
        address,
        phone,
      },
    })

    logger.info(
      { profileId: profile.id, userId },
      'Profile created successfully',
    )
    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to create profile')
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating profile',
      error: error.message,
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    // Mendapatkan ID buku yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ profileId: id, body: req.body }, 'updateProfile: Started')

    // Mendapatkan data profil yang akan diupdate dari request body
    const { name } = req.body

    // Mencari profil dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ profileId: id }, 'Finding profile in database')
    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    })

    // Jika profil tidak ditemukan, kirimkan pesan error
    if (!profile) {
      logger.warn({ profileId: id }, 'Profile not found')
      return res.status(404).json({
        success: false,
        message: `Profile with ID: ${id} not found`,
      })
    }

    // Mengupdate profil dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ profileId: id, name }, 'Updating profile')
    await prisma.profiles.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    })

    logger.info({ profileId: id, name }, 'Profile updated successfully')
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to update profile')
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating profile',
      error: error.message,
    })
  }
}

export const deleteProfile = async (req, res) => {
  try {
    // Mendapatkan ID buku yang akan diupdate dari parameter URL
    // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
    const id = parseInt(req.params.id)
    logger.debug({ profileId: id }, 'deleteProfile: Started')

    // Mencari profil dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ profileId: id }, 'Finding profile in database')
    const profile = await prisma.profiles.findUnique({
      where: {
        id: id,
      },
    })

    // Jika profil tidak ditemukan, kirimkan pesan error
    if (!profile) {
      logger.warn({ profileId: id }, 'Profile not found')
      return res.status(404).json({
        success: false,
        message: `Profile with ID: ${id} not found`,
      })
    }

    // Menghapus profil dengan ID yang sesuai di database menggunakan Prisma Client
    logger.debug({ profileId: id }, 'Deleting profile from database')
    await prisma.profiles.delete({
      where: {
        id: id,
      },
    })

    logger.info({ profileId: id }, 'Profile deleted successfully')
    res.status(200).json({
      success: true,
      message: 'Profile deleted successfully',
    })
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to delete profile')
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting profile',
      error: error.message,
    })
  }
}
