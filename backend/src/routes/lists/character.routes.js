import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import { addToCharacterList, deleteFromCharacterList, createCharacterList, updateCharacterList, deleteCharacterList, getCharacterList, getCharacterLists } from '../../controllers/lists/character.controller.js'

const router = Router()

router.post('/characters/lists', auth, createCharacterList)
router.get('/characters/lists', auth, getCharacterLists)
router.get('/characters/lists/:id', auth, getCharacterList)
router.put('/characters/lists/:id', auth, updateCharacterList)
router.delete('/characters/lists/:id', auth, deleteCharacterList)

router.post('/characters/lists/:id/character/:character_id', auth, addToCharacterList)
router.delete('/characters/lists/:id/character/:character_id', auth, deleteFromCharacterList)

export default router