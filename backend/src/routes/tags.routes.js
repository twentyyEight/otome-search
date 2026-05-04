import { Router } from 'express'
import { getTags, getTag } from '../controllers/tags.controllers.js'

const router = Router()

router.get('/', getTags)
router.get('/:id', getTag)

export default router
