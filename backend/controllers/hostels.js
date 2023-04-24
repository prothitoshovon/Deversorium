import mongoose from 'mongoose';
import hostelModel  from "../models/hostel.js";
import ownerModel from '../models/owner.js';

export const getHostels = async (req,res)=>{
    try{
        const hostels = await hostelModel.find();
        console.log(hostels);
        res.status(200).json(hostels);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createHostel = async (req,res)=>{
    const hostel = req.body;
    const newHostel = new hostelModel(hostel);
    try{
        const o_id = newHostel.owner_id;
        const updatedOwner = await ownerModel.updateOne({ user_id: o_id }, { $set: { hostel_id: newHostel._id, hostel_name:newHostel.name } });

        await newHostel.save();
        res.status(201).json(newHostel);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}


export const updateHostel = async (req,res)=>{
    const { id: _id} = req.params;
    const hostel = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No hostel with that ID');
    }

    const updatedHostel = await hostelModel.findByIdAndUpdate(_id, {...hostel, _id}, {new: true});
    res.json(updatedHostel);
}

export const deleteHostel = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No hostel with that ID');
    }

    await hostelModel.findByIdAndRemove(id);

    res.json('Hostel Deleted Successfully');
}

export const getHostelByOwnerId = async (req, res)=>{
    const {id} = req.params;
    try {
        const ownedHostel = await hostelModel.findOne({owner_id: id});

        if(!ownedHostel)
        {
            return res.status(404).send('No hostels owned by that ID');
        }
        res.status(200).json(ownedHostel);
    } catch(error) {  
        res.status(404).json({message: error.message});
    }
}

export const getHostelByHostelId = async (req, res)=>{
    const {id} = req.params;
    try {
        const hostel = await hostelModel.findOne({_id: id});

        if(!hostel)
        {
            return res.status(404).send('No hostels with that ID');
        }
        res.status(200).json(hostel);
    } catch(error) {  
        res.status(404).json({message: error.message});
    }
}