import { Router } from 'express'
import { getDevs } from '../controllers/devs.controller.js'

const router = Router()

router.get('/devs', getDevs)

export default router
