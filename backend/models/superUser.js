import mongoose from 'mongoose';

const superUserSchema = mongoose.Schema({
    name: String
})

const superUserModel = mongoose.model('superUserModel',superUserSchema);
export default superUserModel;