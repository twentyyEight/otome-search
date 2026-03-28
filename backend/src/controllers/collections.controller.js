import Otome from '../models/otome.models.js'
import FavoriteCharacter from '../models/fav_char.models.js'

export const saveOtome = async (req, res) => {

    const { user_id, id, title, img, state } = req.body

    try {

        await Otome.create({
            user_id,
            id,
            title,
            img,
            state
        })

        return res.status(200).json({ message: "Otome agregado correctamente" })

    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}

export const saveCharacter = async (req, res) => {

    const { user_id, id, name, img } = req.body

    try {

        await FavoriteCharacter.create({
            user_id,
            id,
            name,
            img
        })

        res.status(200).json({ message: "Personaje agregado correctamente" })

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno' })
    }
}