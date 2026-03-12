import { Router } from 'express'
import { saveOtome, saveCharacter } from '../controllers/collections.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/otome/save', auth, saveOtome)
router.post('/character/save', auth, saveCharacter)

export default router