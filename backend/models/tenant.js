import mongoose from 'mongoose';

const tenantSchema = mongoose.Schema({
    assigned_room: {
        type: Boolean,
        default: false
    },
    is_manager: {
        type: Boolean,
        default: false
    },
    room_id: {
        type: String,
        default: 'Unassigned'
    },
    room_number: String,
    hostel_id: {
        type: String,
        default: 'Unassigned'
    },
    has_booked: {
        type: Boolean,
        default: false   
    },
    user_id: String,
    hostel_name: String,
    starting_date: {
        type: Date,
        default: new Date("3000-01-01")
    }
})

const tenantModel = mongoose.model('tenantModel',tenantSchema);

export default tenantModel;