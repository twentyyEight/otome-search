import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id is required']
    },

    name: {
        type: String,
        required: true,
        min: [3, 'Name must be at least 3 characters']
    },

    otomes: [
        {
            id: {
                type: 'String',
                match: [/^v/, 'Otome id must begin with v'],
                required: [true, 'Otome id is required']
            }
        }
    ]
});

export default mongoose.model('List', listSchema)