import mongoose from "mongoose"

const favoriteCharacterSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model('favoriteCharacter', favoriteCharacterSchema)