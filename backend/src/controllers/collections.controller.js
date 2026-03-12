import userCollection from '../models/collection.models.js'
import favoriteCharacter from '../models/fav_char.models.js'

export const saveOtome = async (req, res) => {

    const { user_id, game_id, game_name, game_img, state } = req.body

    try {

        const new_otome = new userCollection({
            user_id,
            game_id,
            game_name,
            game_img,
            state
        })

        await new_otome.save()

        res.status(200).json({ message: "Otome agregado correctamente" })

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno' })
    }
}

export const saveCharacter = async (req, res) => {

    const { user_id, character_id, character_name, character_img } = req.body

    try {
        
        const new_char = new favoriteCharacter({
            user_id,
            character_id,
            character_name,
            character_img
        })

        await new_char.save()

        res.status(200).json({ message: "Personaje agregado correctamente" })

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno' })
    }
}