import { Router } from 'express'
import { getTags, getTag, getTagCategories } from '../controllers/tags.controller.js'

const router = Router()

router.get('/tags', getTags)
router.get('/tags/categories', getTagCategories)
router.get('/tags/:id', getTag)

export default router
