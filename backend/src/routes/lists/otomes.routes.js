import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import { createOtomeList, getOtomeList, getOtomeLists, updateOtomeList, deleteOtomeList, addToOtomeList, deleteFromOtomeList } from '../../controllers/lists/otomes.controller.js'

const router = Router()

router.post('/lists', auth, createOtomeList)
router.get('/lists/:id', auth, getOtomeList)
router.get('/lists', auth, getOtomeLists)
router.put('/lists/:id', auth, updateOtomeList)
router.delete('/lists/:id', auth, deleteOtomeList)

router.post('/lists/:id/otome/:otome_id', auth, addToOtomeList)
router.delete('/lists/:id/otome/:otome_id', auth, deleteFromOtomeList)

export default router