import mongoose from "mongoose"

const favoriteCharacterSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, 'User id is required']
    },

    id: {
        type: String,
        require: [true, 'Character id is required']
    },

    name: {
        type: String,
        require: [true, 'Character name is required']
    },

    img: {
        type: String
    }
})

export default mongoose.model('FavoriteCharacter', favoriteCharacterSchema)