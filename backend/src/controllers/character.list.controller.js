import CharacterList from '../models/character.list.model.js'

export const createCharacterList = async (req, res) => {

    const { name } = req.body
    const { id } = req.user

    try {
        await CharacterList.create({ user_id: id, name })
        return res.status(200).json({ message: 'List created successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateCharacterList = async (req, res) => {

    const { id } = req.params
    const { name } = req.body
    const { id: user_id } = req.user

    try {
        const result = await CharacterList.updateOne({ _id: id, user_id }, { $set: { name } })

        if (result.matchedCount === 0) return res.status(404).json({ message: 'List not found' })

        return res.status(200).json({ message: 'List edited correctly' })

    } catch (error) {
        return res.status(err.status || 500).json({ message: err.message })
    }
}

export const deleteCharacterList = async (req, res) => {

    const { id } = req.params
    const { id: user_id } = req.user

    try {
        await CharacterList.deleteOne({ _id: id, user_id })
        return res.status(200).json({ message: 'List deleted successfully' })
    } catch (error) {
        return res.status(err.status || 500).json({ message: err.message })
    }
}

export const getCharacterLists = async (req, res) => {

    const { id } = req.user

    try {
        const lists = await CharacterList.find({ user_id: id }).select('name')
        return res.json(lists)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getCharacterList = async (req, res) => {

    const { id: user_id } = req.user
    const { id } = req.params

    try {

        const list = await CharacterList.findOne({ user_id, _id: id }).select('name characters')

        if (!list) return res.status(404).json({ message: 'List not found' })

        return res.status(200).json(list)

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
}


export const addToCharacterList = async (req, res) => {

    const { id: list_id, character_id } = req.params
    const { id: user_id } = req.user

    try {

        const exists = await CharacterList.findOne({ user_id, _id: list_id, 'characters.id': character_id })

        if (exists) {
            return res.status(409).json({ message: 'Character is already saved in this list' })
        } else {
            await CharacterList.updateOne(
                { user_id, _id: list_id },
                { $push: { characters: { id: character_id } } },
            )

            return res.status(200).json({ message: "Character added successfully" })
        }

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno' })
    }
}

export const deleteFromCharacterList = async (req, res) => {

    const { id: list_id, character_id } = req.params
    const { id: user_id } = req.user

    try {
        const result = await CharacterList.updateOne(
            { user_id, _id: list_id },
            { $pull: { characters: { character_id } } }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'Character not found' })

        return res.status(200).json({ message: 'Character deleted successfully' })

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
}