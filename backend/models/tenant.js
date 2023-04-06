import mongoose from 'mongoose';

const tenantSchema = mongoose.Schema({
    name: String,
    phone: String,
    assignedRoom: Boolean,
    isManager: Boolean,
    room_id: {
        type: String,
        default: 'Unassigned'
    },
    hostel_id: {
        type: String,
        default: 'Unassigned'
    },
})

const tenantModel = mongoose.model('tenantModel',tenantSchema);

export default tenantModel;