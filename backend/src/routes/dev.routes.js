import { Router } from 'express'
import { getDevs } from '../controllers/dev.controller.js'

const router = Router()

router.get('/devs', getDevs)

export default router
