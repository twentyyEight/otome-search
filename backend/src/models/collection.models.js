import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },

    otome_id: {
        type: String,
        required: true
    },

    otome_title: {
        type: String,
        required: true
    },

    otome_img: {
        type: String
    },

    state: {
        type: Number,
        enum: [0,1,2,3],
        required: true
    }
})

export default mongoose.model('collection', collectionSchema)