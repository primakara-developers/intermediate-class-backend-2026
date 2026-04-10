import express from 'express'
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from '../controllers/profiles.controllers.js'

const router = express.Router()

router.get('/', getAllProfiles)
router.get('/:id', getProfileById)
router.post('/', createProfile)
router.put('/:id', updateProfile)
router.delete('/:id', deleteProfile)

export default router
