import mongoose from 'mongoose';

export const otomeSchema = new mongoose.Schema({

    id: {
        type: 'String',
        required: [true, 'Otome id is required']
    }
})

export default mongoose.model('Otome', otomeSchema)