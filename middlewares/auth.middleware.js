import 'dotenv/config'
import jwt from 'jsonwebtoken'
import logger from '../configs/logger.config.js'

export const authenticateToken = (req, res, next) => {
  try {
    logger.debug({ path: req.path }, 'authenticateToken: Started')
    // Mendapatkan token dari header Authorization
    const authHeader = req.headers['authorization']

    // Memisahkan token dari header Authorization yang biasanya berbentuk "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1]

    // Jika token tidak ditemukan, kirimkan pesan error
    if (!token) {
      logger.warn({ path: req.path }, 'Access token is missing')
      return res.status(403).json({
        error: 'Access token is missing',
      })
    }

    // Memverifikasi token JWT menggunakan secret key dari environment variable
    logger.debug({ path: req.path }, 'Verifying JWT token')
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        logger.warn(
          { path: req.path, error: err.message },
          'Invalid access token',
        )
        return res.status(403).json({
          error: 'Invalid access token',
        })
      }

      req.user = user
      logger.info(
        { userId: user.id, path: req.path },
        'User authenticated successfully',
      )

      next()
    })
  } catch (error) {
    logger.error(
      { error: error.message, path: req.path },
      'Authentication error',
    )
    res.status(500).json({
      error: 'An error occurred during authentication',
    })
  }
}
