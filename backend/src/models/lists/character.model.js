import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({

    id: {
        type: String,
        match: [/^c/, 'Invalid character id format'],
        required: [true, 'Characted id is required']
    }
})

const characterListSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required']
    },

    name: {
        type: String,
        required: [true, 'Characted id is required'],
        min: [3, 'Name must be at least 3 characters'] 
    },

    characters: [characterSchema]
})

export default mongoose.model('CharacterList', characterListSchema)