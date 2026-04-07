import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import { addCharacter, deleteCharacter, getCharacter, getCharacters } from '../../controllers/lists/characters.controller.js'

const router = Router()

router.get('/characters', auth, getCharacters)
router.get('/characters/:id', auth, getCharacter)
router.post('/characters', auth, addCharacter)
router.delete('/characters/:id', auth, deleteCharacter)

export default router