import { Router } from 'express'
import { register, login, logout } from "../controllers/auth.controller.js"
import { verifyToken } from '../middlewares/verify.token.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/verify', verifyToken)
router.post('/profile', verifyToken, (req, res) => res.send('Perfil'))

export default router