import { Router } from 'express'
import { getTags, getTag, getTagCategories, getTagsSuggestions } from '../controllers/tags.controller.js'

const router = Router()

router.get('/tags', getTags)
router.get('/tags/categories', getTagCategories)
router.post('/tags/suggestions', getTagsSuggestions)
router.get('/tags/:id', getTag)

export default router
