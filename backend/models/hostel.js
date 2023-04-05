import mongoose from 'mongoose';

const hostelSchema = mongoose.Schema({
    name: String,
    address: String,
    phone: {
        type: String,
        default: 'Not Available'
    },
    owner: [String]
})

const hostelModel = mongoose.model('hostelModel',hostelSchema);

export default hostelModel;