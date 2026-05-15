import cloudinary from '../configs/cloudinary.config.js'
import logger from '../configs/logger.config.js'

export const getFileUrl = (publicId) => {
  return cloudinary.v2.url(publicId)
}

export const uploadFile = async (
  file,
  options = {
    folder: 'library-api/book/covers',
  },
) => {
  try {
    // Mengunggah file ke Cloudinary menggunakan metode uploader.upload
    // File diunggah dalam format base64 dengan menyertakan tipe MIME
    // Opsi tambahan dapat disertakan, seperti folder tujuan di Cloudinary
    // Hasil upload akan berisi informasi tentang file yang diunggah, termasuk URL dan public_id
    logger.debug(
      { fileName: file.filename, folder: options.folder },
      'Uploading file to Cloudinary',
    )
    const result = await cloudinary.v2.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      options,
    )

    logger.info(
      { publicId: result.public_id, fileName: file.filename },
      'File uploaded successfully',
    )
    return result
  } catch (error) {
    logger.error(
      { error: error.message, fileName: file.filename },
      'Error uploading file',
    )
    throw new Error('Error uploading image')
  }
}

export const deleteFile = async (publicId) => {
  try {
    logger.debug({ publicId }, 'Deleting file from Cloudinary')
    const result = await cloudinary.v2.uploader.destroy(publicId)

    logger.info({ publicId }, 'File deleted successfully')
    return result
  } catch (error) {
    logger.error({ error: error.message, publicId }, 'Error deleting file')
    throw new Error('Error deleting image')
  }
}
