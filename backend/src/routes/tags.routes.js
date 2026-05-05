import { Router } from 'express'
import { getTags, getTag, getTagsSuggestions } from '../controllers/tags.controllers.js'

const router = Router()

router.get('/', getTags)
router.post('/suggestions', getTagsSuggestions)
router.get('/:id', getTag)

export default router
