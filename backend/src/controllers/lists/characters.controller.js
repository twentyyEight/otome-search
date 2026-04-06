import FavoriteCharacterList from "../../models/lists/favorite.character.list.models.js";

export const addCharacter = async (req, res) => {

    const { id } = req.body
    const { id: user_id } = req.user

    try {

        const exists = await FavoriteCharacterList.findOne({ user_id, 'favoriteCharacters.id': id })

        if (exists) {
            return res.status(409).json({ message: 'Character is already saved' })
        } else {
            await FavoriteCharacterList.updateOne(
                { user_id: user_id },
                { $push: { favoriteCharacters: { id } } },
                { upsert: true, runValidators: true }
            )

            return res.status(200).json({ message: "Character added successfully" })
        }

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno' })
    }
}

export const deleteCharacter = async (req, res) => {

    const { id } = req.params
    const { id: user_id } = req.user

    try {
        const result = await FavoriteCharacterList.updateOne(
            { user_id },
            { $pull: { favoriteCharacters: { id } } }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'Character not found' })

        return res.status(200).json({ message: 'Character deleted successfully' })

    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
}