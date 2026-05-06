import mongoose from 'mongoose';

const charactersListSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required']
    },

    name: {
        type: String,
        required: [true, 'Character name is required'],
        min: [3, 'Name must be at least 3 characters'] 
    },

    characters: [
        {
            id: {
                type: String,
                match: [/^c/, 'Invalid character id format'],
                required: [true, 'Character id is required']
            }
        }
    ]
})

export default mongoose.model('CharactersList', charactersListSchema)