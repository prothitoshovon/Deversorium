import mongoose from 'mongoose';

const tenantSchema = mongoose.Schema({
    assigned_room: Boolean,
    is_manager: Boolean,
    room_id: {
        type: String,
        default: 'Unassigned'
    },
    room_number: String,
    hostel_id: {
        type: String,
        default: 'Unassigned'
    },
    hostel_name: String
})

const tenantModel = mongoose.model('tenantModel',tenantSchema);

export default tenantModel;