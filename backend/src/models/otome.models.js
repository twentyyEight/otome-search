import mongoose from "mongoose";

const otomeSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required'] 
    },

    id: {
        type: String,
        required: [true, 'Otome id is required']
    },

    title: {
        type: String,
        required: [true, 'Otome title is required']
    },

    img: {
        type: String
    },

    state: {
        type: Number,
        enum: [0,1,2,3,4],
        required: [true, 'State is required']
    }
})

export default mongoose.model('Otome', otomeSchema)