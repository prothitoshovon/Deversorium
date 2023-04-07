import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    hostel_id: {type: String, required: true},
    hostel_name: String,
    area: Integer, // in square feet
    rent: Integer, // per month
    tenant_id:
    {
        type: String,
        default: 'Unassigned'
    },
    next_vacancy_date: Date
})

const roomModel = mongoose.model('roomModel',roomSchema);

export default roomModel;