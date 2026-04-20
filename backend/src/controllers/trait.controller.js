import { Trait } from "../models/trait.model.js"

export const getTraits = async (req, res) => {

    /* OBTENCIÓN Y VALIDACIÓN DE QUERIES DE LA URL */

    // Valida que el número sea un entero y mayor a 0
    let { page, name } = req.query

    page = Number(page)
    if (!Number.isFinite(page) || page < 1) page = 1

    // Limpieza de caracteres que podrian producir un ataque regex
    name = (name || '').trim()
    const safe_name = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    /* CONSTRUCCIÓN FILTROS BD */
    const skip = (page - 1) * 100

    /* LLAMADA A BD*/
    try {
        const traits = await Trait
            .find({ applicable: true, name: { $regex: `^${safe_name}`, $options: 'i' } })
            .sort({ name: 1 })
            .skip(skip)
            .limit(100)

        const total = await Trait.countDocuments({ applicable: true })

        return res.json({ traits, total })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getChildTraits = async (req, res) => {

    /* OBTENCIÓN Y VALIDACIÓN DE ID DE LA URL */
    let { id } = req.params

    // Validación de input para evitar requests malformados / inyección
    id = (id || '').trim()
    if (!/^i?\d+$/.test(id)) return res.status(400).json({ message: 'Invalid trait id format' })

    /* LLAMADA A LA BD */
    try {
        const childTraits = await Trait.find({ parents: id }).select('id name -_id')
        return res.json(childTraits)
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

    // Limpieza de caracteres que podrian producir un ataque regex
    const name = (req.body.input || '').trim()
    const safe_name = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    try {
        const suggestions = await Trait
            .find({ name: { $regex: `^${safe_name}`, $options: 'i' } })
            .sort({ name: 1 })
            .limit(10)
            .select('name id')

        return res.json(suggestions)

    } catch (error) {

        return res.status(500).json({ message: 'Error searching suggestions' })
    }
}