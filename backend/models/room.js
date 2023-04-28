import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    room_number: String,
    hostel_id: {type: String, required: true},
    hostel_name: String,
    hostel_address: String,
    area: Number, // in square feet
    rent: Number, // per month
    tenant_id:
    {
        type: String,
        default: 'Unassigned'
    },
    next_vacancy_date: Date
})

const roomModel = mongoose.model('roomModel',roomSchema);

export default roomModel;