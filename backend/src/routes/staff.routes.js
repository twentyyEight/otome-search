import { Router } from 'express'
import { getStaffs } from '../controllers/staff.controller.js'

const router = Router()

router.get('/staffs', getStaffs)

export default router