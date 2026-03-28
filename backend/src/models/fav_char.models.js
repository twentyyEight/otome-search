import mongoose from "mongoose"

const favoriteCharacterSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },

    id: {
        type: String,
        require: true
    },

    name: {
        type: String,
        require: true
    },

    img: {
        type: String
    }
})

export default mongoose.model('FavoriteCharacter', favoriteCharacterSchema)