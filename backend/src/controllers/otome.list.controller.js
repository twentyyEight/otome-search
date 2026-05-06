import OtomeList from '../models/otome.list.model.js'

export const createOtomeList = async (req, res) => {

    const { name } = req.body
    const { id } = req.user

    try {
        await OtomeList.create({ user_id: id, name })
        return res.status(200).json({ message: 'List created successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateOtomeList = async (req, res) => {

    const { id } = req.params
    const { name } = req.body
    const { id: user_id } = req.user

    try {
        const result = await OtomeList.updateOne({ _id: id, user_id }, { $set: { name } })

        if (result.matchedCount === 0) return res.status(404).json({ message: 'List not found' })

        return res.status(200).json({ message: 'List edited correctly' })

    } catch (error) {
        return res.status(err.status || 500).json({ message: err.message })
    }
}

export const deleteOtomeList = async (req, res) => {

    const { id } = req.params
    const { id: user_id } = req.user

    try {
        await OtomeList.deleteOne({ _id: id, user_id })
        return res.status(200).json({ message: 'List deleted successfully' })
    } catch (error) {
        return res.status(err.status || 500).json({ message: err.message })
    }
}

export const getOtomeLists = async (req, res) => {

    const { id } = req.user

    try {

        const lists = await OtomeList.find({ user_id: id }).select('name otomes.id')
        return res.json(lists)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getOtomeList = async (req, res) => {

    const { id: user_id } = req.user
    const { id } = req.params

    try {

        const list = await OtomeList.findOne({ user_id, _id: id }).select('name otomes')

        if (!list) return res.status(404).json({ message: 'List not found' })

        return res.status(200).json(list)

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
}


export const addToOtomeList = async (req, res) => {

    const { id: list_id, otome_id } = req.params
    const { id: user_id } = req.user

    try {
        const exists = await OtomeList.findOne({ user_id, 'otomes.id': otome_id })

        if (exists) {
            return res.status(409).json({ message: 'Otome is already saved in this list' })
        } else {

            const result = await OtomeList.updateOne(
                { user_id, _id: list_id },
                { $push: { otomes: { id: otome_id } } }
            );

            if (result.matchedCount === 0) return res.status(404).json({ message: 'List not found' })

            return res.status(200).json({ message: 'Otome saved successfully' })
        }

    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message })
    }
}

export const deleteFromOtomeList = async (req, res) => {

    const { id: list_id, otome_id } = req.params
    const { id: user_id } = req.user

    try {
        const result = await OtomeList.updateOne(
            { user_id, _id: list_id },
            { $pull: { otomes: { id: otome_id } } }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'Otome not found' })

        return res.status(200).json({ message: 'Otome deleted successfully' })

    } catch (error) {
        return res.status(err.status || 500).json({ message: err.message })
    }
}