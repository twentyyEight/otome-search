import { Router } from 'express'
import { getTraitsCategories, getTraits, getTrait } from '../controllers/traits.controller.js'

const router = Router()

router.get('/traits', getTraits)
router.get('/traits/categories', getTraitsCategories)
router.get('/traits/:id', getTrait)

export default router