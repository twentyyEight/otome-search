import { Tag } from "../models/tag.models.js"

export const getTags = async (req, res) => {

    const { page, name } = req.query
    const type = [].concat(req.query.type).filter(Boolean)

    try {
        const skip = page * 100 - 100

        let filters = { searchable: true }
        if (name) filters.name = { $regex: `^${name}`, $options: 'i' }
        if (type.length > 0) filters.cat = { $in: type }

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

    const { id } = req.params

    try {
        const tag_id = Number(id.replace('g', ''))

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
        return res.json(categories)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}