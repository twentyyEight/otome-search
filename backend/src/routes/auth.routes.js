import { Router } from 'express'
import { register, login, logout, verifyToken, profile } from "../controllers/auth.controller.js"
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile/:name', auth, profile)

export default router