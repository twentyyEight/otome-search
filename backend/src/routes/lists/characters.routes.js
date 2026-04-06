import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import { addCharacter, deleteCharacter } from '../../controllers/lists/characters.controller.js'

const router = Router()

router.post('/characters', auth, addCharacter)
router.delete('/characters/:id', auth, deleteCharacter)

export default router