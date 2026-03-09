import mongoose from "mongoose";

const userOtomesSchema = new mongoose.Schema({

    user_id: {
        type: ObjectId,
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
        enum: [0,1,2],
        required: true
    }
})

export default mongoose.model('userOtomes', userOtomesSchema)