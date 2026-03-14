import collection from '../models/collection.models.js'
import favoriteCharacter from '../models/fav_char.models.js'
import User from '../models/user.models.js'

export const profile = async (req, res) => {

    const { id } = req.body

    try {
        
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

        const collections = await collection.find({ user_id: id })
        
        const characters = await favoriteCharacter.find({ user_id: id })

        return res.status(200).json({ name: user.name, collections, characters })

    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const saveOtome = async (req, res) => {

    const { user_id, otome_id, otome_title, otome_img, state } = req.body

    try {

        const new_otome = new collection({
            user_id,
            otome_id,
            otome_title,
            otome_img,
            state
        })

        await new_otome.save()

        return res.status(200).json({ message: "Otome agregado correctamente" })

    } catch (error) {
        
        return res.status(500).json({ message: error.message })
    }
}

export const saveCharacter = async (req, res) => {

    const { user_id, id, name, img } = req.body

    try {
        
        const new_char = new favoriteCharacter({
            user_id,
            id,
            name,
            img
        })

        await new_char.save()

        res.status(200).json({ message: "Personaje agregado correctamente" })

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Error interno' })
    }
}