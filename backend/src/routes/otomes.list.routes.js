import { Router } from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { createOtomeList, getOtomeList, getOtomeLists, updateOtomeList, deleteOtomeList, addToOtomeList, deleteFromOtomeList } from '../controllers/otome.list.controller.js'

const router = Router()

router.post('/', auth, createOtomeList)
router.get('/', auth, getOtomeLists)
router.get('/:id', auth, getOtomeList)
router.put('/:id', auth, updateOtomeList)
router.delete('/:id', auth, deleteOtomeList)

router.post('/:id/otome/:otome_id', auth, addToOtomeList)
router.delete('/:id/otome/:otome_id', auth, deleteFromOtomeList)

export default router