import Tag from '../models/tag.model.js'

export const getTags = async (req, res) => {
    try {
        const rootTags = await Tag.find(
            { parents: { $size: 0 } },
            { _id: 0, name: 1, description: 1, id: 1 }
        )

        const rootIds = rootTags.map(tag => tag.id)

        const childTags = await Tag.find(
            {
                $expr: { $gt: [{ $size: '$parents' }, 0] },
                parents: { $not: { $elemMatch: { $nin: rootIds } } }
            },
            { _id: 0, id: 1, name: 1, parents: 1 }
        )

        const tags = rootTags.map(root => ({
            name: root.name,
            description: root.description,
            childs: childTags
                .filter(child => child.parents.includes(root.id))
                .map(({ id, name }) => ({ id, name }))
        }))

        res.json(tags)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getTag = async (req, res) => {

    let { id } = req.params

    try {
        const tag = await Tag.findOne({ id }, { _id: 0, name: 1, description: 1, id: 1 })
        const childs = await Tag.find({ parents: id }, {_id: 0, id: 1, name: 1})

        return res.json({ id: tag.id, name: tag.name, description: tag.description, childs })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTagsSuggestions = async (req, res) => {

    // Limpieza de caracteres que podrian producir un ataque regex
    const name = (req.body.name || '').trim()
    const safe_name = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    try {
        const suggestions = await Tag
            .find({ name: { $regex: `^${safe_name}`, $options: 'i' } }, { _id: 0, name: 1, id: 1 })
            .sort({ name: 1 })
            .limit(10)

        return res.json(suggestions)

    } catch (error) {

        return res.status(500).json({ message: 'Error searching suggestions' })
    }
}