import mongoose from 'mongoose';

const roomRequestSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    user_phone: String,
    user_name: String,
    room_id: {type: String, required: true},
    room_number: String,
    hostel_id: {type: String, required: true},
    hostel_name: String,
    date_issued: Date
})

const roomRequestModel = mongoose.model('roomRequestModel',roomRequestSchema);

export default roomRequestModel;