import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import { addOtomeState, deleteOtomeState, getOtomeState } from '../../controllers/lists/states.controller.js'

const router = Router()

router.post('/states', auth, addOtomeState)
router.get('/states/:id', auth, getOtomeState)
router.delete('/states/:id', auth, deleteOtomeState)

export default router