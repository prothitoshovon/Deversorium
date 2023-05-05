import mongoose from 'mongoose';
import reviewModel from '../models/review.js'

export const getReviews = async(req, res) => {
    try{
        const reviews = await reviewModel.find();
        console.log(reviews);
        res.status(200).json(reviews);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getReviewsByHostel = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No hostels with that ID');
    }
    try{     
        const reviews = await reviewModel.find({hostel_id: id});
        console.log(reviews);
        res.status(200).json(reviews);
    } catch(error){
        res.status(404).json({message: error.message});
    }
} 

export const getReviewsByUser = async(req,res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No tenants with that ID');
    }
    try{     
        const reviews = await reviewModel.find({user_id: _id});
        console.log(reviews);
        res.status(200).json(reviews);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createReview = async (req,res)=>{
    const review = req.body;
    console.log(review)
    const newReview = new reviewModel(review);
    try{
        await newReview.save();
        res.status(201).json(newReview);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updateReview = async (req,res)=>{
    const { id: _id} = req.params;
    const review = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No review with that ID');
    }
    
    const updatedReview = await reviewModel.findByIdAndUpdate(_id, {...review, _id}, {new: true});
    res.json(updatedReview);
}

export const deleteReview = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No review with that ID');
    }

    await reviewModel.findByIdAndRemove(id);

    res.json('Review Deleted Successfully');
}

export const getReviewsByUserAndHostel = async (req, res)=>{
    const uid = req.params.uid;
    const hid = req.params.hid;

    try{     
        const reviews = await reviewModel.findOne({hostel_id: hid, user_id: uid});
        console.log(reviews);
        res.status(200).json(reviews);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}