import { Tag } from "../models/tag.models.js"

export const getTags = async (req, res) => {

    /* OBTENCIÓN Y VALIDACIÓN DE QUERIES DE LA URL */

    // Valida que el número sea un entero y mayor a 0
    let { page = 1, name, type } = req.query
    if (!Number.isFinite(page) || page < 1) page = 1

    // Limpieza de caracteres que podrian producir un ataque regex
    name = (name || '').trim()
    const safe_name = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Evita errores en la consulta por valores invalidos
    const allowed_types = ["ero", "cont", "tech"]
    type = [].concat(type).filter(t => allowed_types.includes(t)).slice(0, 3)

    /* CONSTRUCCIÓN FILTROS */
    const skip = (page - 1) * 100

    let filters = { searchable: true, name: { $regex: `^${safe_name}`, $options: 'i' } }

    if (type.length > 0) filters.cat = { $in: type }

    /* LLAMADA BD */
    try {
        const tags = await Tag
            .find(filters)
            .sort({ name: 1 })
            .skip(skip)
            .limit(100)

        const total = await Tag.countDocuments({ searchable: true })

        return res.json({ tags, total })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTag = async (req, res) => {

    let { id } = req.params

    // Validación de input para evitar requests malformados / inyección
    id = (id || '').trim()
    if (!/^i?\d+$/.test(id)) return res.status(400).json({ message: 'Invalid trait id format' })

    const tag_id = Number(id.replace(/^g/, ''))
    if (!Number.isInteger(tag_id) || tag_id < 1) return res.status(400).json({ message: 'Invalid tag id' })

    try {
        const tagInfo = await Tag.findOne({ id: tag_id })
        const childTags = await Tag.find({ parents: tag_id })

        return res.json({ info: tagInfo, childTags })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTagCategories = async (req, res) => {

    try {
        const categories = await Tag.find({ parents: [] })

        const result = await Promise.all(

            categories.map(async (categorie) => {
                const cat = categorie.toObject()
                const tags = await Tag.find({ parents: cat.id })
                return { ...cat, tags }
            })
        )

        return res.json(result)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}