import Tag from '../models/tag.model.js'

export const getTags = async (req, res) => {
    try {
        const rootTags = await Tag.find(
            { parents: { $size: 0 } },
            { _id: 0, id: 1, name: 1 }
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
            id: root.id,
            name: root.name,
            childs: childTags
                .filter(child => child.parents.includes(root.id))
                .map(({ id, name }) => ({ id, name }))
        }))

        res.json(tags)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}