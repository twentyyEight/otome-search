import { Router } from 'express'
import { auth } from '../../middlewares/auth.middleware.js'
import { addOtomeState, deleteOtomeState } from '../../controllers/lists/states.controller.js'

const router = Router()

router.post('/states', auth, addOtomeState)
router.delete('/states/:id', auth, deleteOtomeState)

export default router