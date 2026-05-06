import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({

    id: { 
        type: String, 
        required: true, 
        unique: true
    },

    name: { 
        type: String, 
        required: true 
    },

    description: {
        type: String
    },
    
    parents: [{ type: String }],
})

export default mongoose.model('Tag', tagSchema)