import logger from '../configs/logger.config.js'

export const authorizeAdmin = (req, res, next) => {
  try {
    logger.debug(
      { userId: req.user?.id, path: req.path },
      'authorizeAdmin: Started',
    )
    // Memeriksa apakah user adalah admin
    // dengan memeriksa properti role pada objek user yang sudah di-decode dari token JWT
    if (!req.user || req.user.role !== 'ADMIN') {
      logger.warn(
        { userId: req.user?.id, role: req.user?.role, path: req.path },
        'Access denied - admin only',
      )
      return res.status(403).json({ error: 'Access denied. Admins only.' })
    }

    logger.info(
      { userId: req.user.id, path: req.path },
      'Admin authorization granted',
    )
    next()
  } catch (error) {
    logger.error(
      { error: error.message, path: req.path },
      'Authorization error',
    )
    res.status(500).json({
      error: 'An error occurred during authorization',
    })
  }
}
