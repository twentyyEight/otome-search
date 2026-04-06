import mongoose from 'mongoose';

const favoriteCharacterSchema = new mongoose.Schema({

    id: {
        type: String,
        required: [true, 'Characted id is required']
    }
})

const favoriteCharacterListSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required']
    },

    favoriteCharacters: [favoriteCharacterSchema]
})

export default mongoose.model('FavoriteCharacterList', favoriteCharacterListSchema)