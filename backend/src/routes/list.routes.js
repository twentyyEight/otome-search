import { Router } from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { createList, getList, getLists, updateList, deleteList, addToList, deleteFromList } from '../controllers/list.controller.js'

const router = Router()

router.post('/', auth, createList)
router.get('/', auth, getLists)
router.get('/:id', auth, getList)
router.put('/:id', auth, updateList)
router.delete('/:id', auth, deleteList)

router.post('/:id/otome/:otome_id', auth, addToList)
router.delete('/:id/otome/:otome_id', auth, deleteFromList)

export default router