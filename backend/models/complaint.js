import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    description: {type: String, required: true},
    room_id: {type: String, required: true},
    room_number: String,
    hostel_id: {type: String, required: true},
    hostel_name: String,
    date_raised: {
        type: Date,
        default: new Date()
    }
})

const complaintModel = mongoose.model('complaintModel',complaintSchema);

export default complaintModel;