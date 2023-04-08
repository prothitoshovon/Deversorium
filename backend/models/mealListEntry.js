import mongoose from 'mongoose';

const mealListEntrySchema = mongoose.Schema({
    user_id: {type: String, required: true},
    user_name: String,
    date: {type: Date, required: true},
    lunch: {
        type: Number,
        min: 0,
        max: 2
    },
    dinner: {
        type: Number,
        min: 0,
        max: 2
    }
})

const mealListEntryModel = mongoose.model('mealListEntryModel',mealListEntrySchema);

export default mealListEntryModel;