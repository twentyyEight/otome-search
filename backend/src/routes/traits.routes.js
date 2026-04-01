import { Router } from 'express'
import { getTraitsCategories, getTraits, getTrait, getTraitsSuggestions } from '../controllers/traits.controller.js'

const router = Router()

router.get('/traits', getTraits)
router.get('/traits/categories', getTraitsCategories)
router.post('/traits/suggestions', getTraitsSuggestions)
router.get('/traits/:id', getTrait)

export default router