import mongoose from 'mongoose';

const tenantSchema = mongoose.Schema({
    name: String,
    phone: String,
    assignedRoom: Boolean,
    isManager: Boolean,
    room_id: String,
    hostel_id: String
})

const tenantModel = mongoose.model('tenantModel',tenantSchema);

export default tenantModel;