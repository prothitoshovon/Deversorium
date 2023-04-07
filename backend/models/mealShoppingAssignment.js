import mongoose from 'mongoose';

const mealShoppingAssignmentSchema = mongoose.Schema({
    date: {type: Date, required: true},
    user_id: {type: Date, required: true},
    user_name: String
})

const mealShoppingAssignmentModel = mongoose.model('mealShoppingAssignmentModel',mealShoppingAssignmentSchema);

export default mealShoppingAssignmentModel;