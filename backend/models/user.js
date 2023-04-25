import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name : {type: String, required: true},
    phone: {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    role : {type: Number, required: true}, // 1 for tenant, 2 for owner, 3 for superuser
})


export default  mongoose.model('UserModel',userSchema);
