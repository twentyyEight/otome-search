import { Router } from 'express'
import { saveOtome, saveCharacter } from '../controllers/collections.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/otome', auth, saveOtome)
router.post('/character', auth, saveCharacter)

export default router