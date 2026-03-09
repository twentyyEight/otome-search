import mongoose from "mongoose"

const { Schema } = mongoose

const favoriteCharactersSchema = new mongoose.Schema({

    user_id: {
        type: ObjectId,
        require: true
    },

    character_id: {
        type: String,
        require: true
    },

    character_name: {
        type: String,
        require: true
    },

    character_img: {
        type: String
    }
})

export default mongoose.model('favoriteCharacter', favoriteCharactersSchema)