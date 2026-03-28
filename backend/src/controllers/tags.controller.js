import { Tag } from "../models/tag.models.js"

export const getTags = async (req, res) => {

    try {
        const tags = await Tag.find({ searchable: true })
        return res.json(tags)

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

        return res.json({ info: tagInfo, childTags})

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