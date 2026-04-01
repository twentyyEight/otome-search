import { Trait } from "../models/trait.models.js"

export const getTraits = async (req, res) => {

    const { page } = req.query
    const name = (req.query && req.query.name) || ''

    try {
        const skip = page * 100 - 100

        const traits = await Trait
            .find({ applicable: true, name: { $regex: `^${name}`, $options: 'i' } })
            .sort({ name: 1 })
            .skip(skip)
            .limit(100)

        const total = await Trait.countDocuments({ applicable: true })

        return res.json({ traits, total })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTrait = async (req, res) => {

    const { id } = req.params

    try {
        const trait_id = Number(id.replace('i', ''))

        const traitInfo = await Trait.findOne({ id: trait_id })
        const childTraits = await Trait.find({ parents: trait_id })

        return res.json({ info: traitInfo, childTraits })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTraitsCategories = async (req, res) => {

    try {
        const categories = await Trait.find({ parents: [] })

        const result = await Promise.all(

            categories.map(async (categorie) => {
                const cat = categorie.toObject()
                const tags = await Trait.find({ parents: cat.id })
                return { ...cat, tags }
            })
        )

        return res.json(result)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTraitsSuggestions = async (req, res) => {

    const input = (req.body && req.body.input) || ''

    try {
        const suggestions = await Trait
            .find({ name: { $regex: `^${input}`, $options: 'i' } })
            .sort({ name: 1 })
            .limit(10)
            .select('name id')

        return res.json(suggestions)

    } catch (error) {

        return res.status(500).json({ message: 'Error searching suggestions' })
    }
}