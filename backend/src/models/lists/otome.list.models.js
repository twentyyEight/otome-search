import mongoose from 'mongoose';
import { otomeSchema } from './otome.models.js'

const otomeListSchema = new mongoose.Schema({

    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, 'User id is required']
    },

    name: { 
        type: String, 
        required: true 
    },

    otomes: [otomeSchema]
});

export default mongoose.model('OtomeList', otomeListSchema)