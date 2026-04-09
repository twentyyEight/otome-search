import { Router } from 'express'
import { getTraitsCategories, getTraits, getChildTraits, getTraitsSuggestions } from '../controllers/trait.controller.js'

const router = Router()

router.get('/traits', getTraits)
router.get('/traits/categories', getTraitsCategories)
router.post('/traits/suggestions', getTraitsSuggestions)
router.get('/traits/childs/:id', getChildTraits)

export default router