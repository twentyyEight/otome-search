import { Router } from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { addToCharacterList, deleteFromCharacterList, createCharacterList, updateCharacterList, deleteCharacterList, getCharacterList, getCharacterLists } from '../controllers/character.list.controller.js'

const router = Router()

router.post('/', auth, createCharacterList)
router.get('/', auth, getCharacterLists)
router.get('/:id', auth, getCharacterList)
router.put('/:id', auth, updateCharacterList)
router.delete('/:id', auth, deleteCharacterList)

router.post('/:id/character/:character_id', auth, addToCharacterList)
router.delete('/:id/character/:character_id', auth, deleteFromCharacterList)

export default router