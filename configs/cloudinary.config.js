import 'dotenv/config'
import cloudinary from 'cloudinary'
import logger from './logger.config.js'

logger.debug(
  { cloudName: process.env.CLOUDINARY_CLOUD_NAME },
  'Initializing Cloudinary',
)

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

logger.info('Cloudinary configured successfully')

export default cloudinary
