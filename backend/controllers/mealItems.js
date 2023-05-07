import mongoose from 'mongoose';
import mealItemModel from '../models/mealItem.js'

export const getMealItems = async(req, res) => {
    try{
        const mealItems = await mealItemModel.find();
        console.log(mealItems);
        res.status(200).json(mealItems);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getMealItemsByHostel = async(req,res) => {
    const {id} = req.params;
    try{     
        const mealItems = await mealItemModel.find({hostel_id: id});
        console.log(mealItems);
        res.status(200).json(mealItems);
    } catch(error){
        res.status(404).json({message: error.message});
    }
} 


export const createMealItem = async (req,res)=>{
    const mealItem = req.body;
    const newMealItem = new mealItemModel(mealItem);
    try{
        await newMealItem.save();
        res.status(201).json(newMealItem);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updateMealItem = async (req,res)=>{
    const { id: _id} = req.params;
    const mealItem = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No mealItem with that ID');
    }
    
    const updatedMealItem = await mealItemModel.findByIdAndUpdate(_id, {...mealItem, _id}, {new: true});
    res.json(updatedMealItem);
}

export const deleteMealItem = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No mealItem with that ID');
    }

    await mealItemModel.findByIdAndRemove(id);

    res.json('MealItem Deleted Successfully');
}