import mongoose from "mongoose";

const otomeSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },

    id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    img: {
        type: String
    },

    state: {
        type: Number,
        enum: [0,1,2,3],
        required: true
    }
})

export default mongoose.model('Otome', otomeSchema)