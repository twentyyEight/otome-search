import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 4
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min: 8
    }
})

export default mongoose.model('User', userSchema)