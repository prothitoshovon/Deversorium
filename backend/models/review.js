import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    user_id: {type: String, required: true},
    user_name: String,
    hostel_id: {type: String, required: true},
    comments: {type: String, required: true},
    date_posted: 
    {
        type: Date,
        default: new Date()
    },
    stars: {type: Number, required: true}
})

const reviewModel = mongoose.model('reviewModel',reviewSchema);

export default reviewModel;