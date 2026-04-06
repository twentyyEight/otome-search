import mongoose from 'mongoose'
import { otomeSchema } from './otome.models.js'

const otomeStateSchema = new mongoose.Schema(otomeSchema.obj)
otomeStateSchema.add({
    state: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        required: [true, 'State is required']
    }
})

const otomeStateListSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: [true, 'User id is required'] },
    otomes: [otomeStateSchema]
});

export default mongoose.model('OtomeStateList', otomeStateListSchema);