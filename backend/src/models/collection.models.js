import mongoose from "mongoose";

const userCollectionSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },

    game_id: {
        type: String,
        required: true
    },

    game_name: {
        type: String,
        required: true
    },

    game_img: {
        type: String
    },

    state: {
        type: Number,
        enum: [0,1,2,3],
        required: true
    }
})

export default mongoose.model('userCollection', userCollectionSchema)