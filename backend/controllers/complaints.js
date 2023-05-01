import mongoose from 'mongoose';
import complaintModel from '../models/complaint.js'

export const getComplaints = async(req, res) => {
    try{
        const complaints = await complaintModel.find();
        console.log(complaints);
        res.status(200).json(complaints);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getComplaintsByHostel = async(req,res) => {
    const id = req.params.id;
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No hostels with that ID');
    }
    try{     
        const complaints = await complaintModel.find({hostel_id: id});
        console.log(complaints);
        res.status(200).json(complaints);
    } catch(error){
        res.status(404).json({message: error.message});
    }
} 

export const getComplaintsByUser = async(req,res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No tenants with that ID');
    }
    try{     
        const complaints = await complaintModel.find({user_id: _id});
        console.log(complaints);
        res.status(200).json(complaints);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createComplaint = async (req,res)=>{
    const complaint = req.body;
    const newComplaint = new complaintModel(complaint);
    try{
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updateComplaint = async (req,res)=>{
    const { id: _id} = req.params;
    const complaint = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No complaint with that ID');
    }

    const updatedComplaint = await complaintModel.findByIdAndUpdate(_id, {...complaint, _id}, {new: true});
    res.json(updatedComplaint);
}

export const deleteComplaint = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No complaint with that ID');
    }

    await complaintModel.findByIdAndRemove(id);

    res.json('Complaint Deleted Successfully');
}