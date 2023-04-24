import mongoose from "mongoose";
import roomRequestModel from "../models/roomRequest.js";


export const getRoomRequests = async (req,res)=>{
    try{
        const roomRequests = await roomRequestModel.find();
        console.log(roomRequests);
        res.status(200).json(roomRequests);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getRoomRequestsByRoomId = async (req, res) => {
    const id = req.params.id;
    try{
        const roomRequests = await roomRequestModel.find({room_id: id}).sort({date_issued: 1});
        console.log(roomRequests);
        res.status(200).json(roomRequests);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getRoomRequestsByHostelId = async (req, res) => {
    const id = req.params.id;
    try{
        const roomRequests = await roomRequestModel.find({hostel_id: id}).sort({date_issued: 1});
        console.log(roomRequests);
        res.status(200).json(roomRequests);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getRoomRequestsByUserId = async (req, res) => {
    const id = req.params.id;
    try{
        const roomRequests = await roomRequestModel.find({user_id: id}).sort({date_issued: 1});
        console.log(roomRequests);
        res.status(200).json(roomRequests);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createRoomRequest = async (req,res)=>{
    const roomRequest = req.body;
    
    const newRoomRequest = new roomRequestModel(roomRequest)
    try{
        await newRoomRequest.save();
        res.status(201).json(newRoomRequest);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}


export const updateRoomRequest = async (req,res)=>{
    const { id: _id} = req.params;
    const roomRequest = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No requests for rooms with that ID');
    }

    const updatedRoomRequest = await roomRequestModel.findByIdAndUpdate(_id, {...roomRequest, _id}, {new: true});
    res.json(updatedRoomRequest);
}

export const deleteRoomRequest = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No requests for rooms with that ID');
    }

    await roomRequestModel.findByIdAndRemove(id);

    res.json('Room Request Deleted Successfully');
}
