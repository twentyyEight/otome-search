import { Router } from 'express'
import { saveOtome, saveCharacter, profile } from '../controllers/collections.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/otome', auth, saveOtome)
router.post('/character', auth, saveCharacter)
router.post('/profile', auth, profile)

export default router