import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import { createOtomeList, getOtomeList, getOtomeLists, updateOtomeList, deleteOtomeList, addToOtomeList, deleteFromOtomeList } from '../../controllers/lists/otome.controller.js'

const router = Router()

router.post('/otomes/lists', auth, createOtomeList)
router.get('/otomes/lists', auth, getOtomeLists)
router.get('/otomes/lists/:id', auth, getOtomeList)
router.put('/otomes/lists/:id', auth, updateOtomeList)
router.delete('/otomes/lists/:id', auth, deleteOtomeList)

router.post('/otomes/lists/:id/otome/:otome_id', auth, addToOtomeList)
router.delete('/otomes/lists/:id/otome/:otome_id', auth, deleteFromOtomeList)

export default router