import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: [true, "A user with this name already exists"],
        trim: true,
        minlength: [4, "Name must be at least 4 characters"]
    },
    
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, "A user with this email already exists"]
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, "Password must be at least 8 characters"]
    }
})

export default mongoose.model('User', userSchema)