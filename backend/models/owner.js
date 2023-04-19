import mongoose from 'mongoose';

const ownerSchema = mongoose.Schema({
    user_id: String,
    hostel_id:String,
    hostel_name: String
})

const ownerModel = mongoose.model('ownerModel',ownerSchema);

export default ownerModel;