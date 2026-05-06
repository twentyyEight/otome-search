import mongoose from 'mongoose';

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

    otomes: [
        {
            id: {
                type: 'String',
                required: [true, 'Otome id is required']
            }
        }
    ]
});

export default mongoose.model('OtomesList', otomesListSchema)