import mongoose from 'mongoose';

const otomeSchema = new mongoose.Schema({

    id: {
        type: 'String',
        required: [true, 'Otome id is required']
    }
})

const otomeListSchema = new mongoose.Schema({

    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, 'User id is required']
    },

    name: { 
        type: String, 
        required: true,
        min: [3, 'Name must be at least 3 characters'] 
    },

    otomes: [otomeSchema]
});

export default mongoose.model('OtomeList', otomeListSchema)