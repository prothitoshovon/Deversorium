import mongoose from 'mongoose';
import ownerModel  from '../models/owner.js';

export const getOwners = async (req,res)=>{
    try{
        const owners = await ownerModel.find();
        console.log(owners);
        res.status(200).json(owners);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createOwner = async (req,res)=>{
    const owner = req.body;
    const newOwner = new ownerModel(owner);
    try{
        await newOwner.save();
        res.status(201).json(newOwner);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}


export const updateOwner = async (req,res)=>{
    const { id: _id} = req.params;
    const owner = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No owner with that ID');
    }

    const updatedOwner = await ownerModel.findByIdAndUpdate(_id, {...owner, _id}, {new: true});
    res.json(updatedOwner);
}

export const deleteOwner = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No owner with that ID');
    }

    await ownerModel.findByIdAndRemove(id);

    res.json('Owner Deleted Successfully');
}

export const getOwnersByUserId = async (req,res)=>{
    const id = req.params.id;
    try{
        const owners = await ownerModel.find({user_id: id});
        console.log(owners);
        res.status(200).json(owners);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}