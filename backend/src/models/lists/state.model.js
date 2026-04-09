import mongoose from 'mongoose'

const stateSchema = new mongoose.Schema({

    id: {
        type: 'String',
        required: [true, 'Otome id is required']
    },

    state: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        required: [true, 'State is required']
    }
})

const stateListSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: [true, 'User id is required'] },
    otomes: [stateSchema]
});

export default mongoose.model('StateList', stateListSchema);