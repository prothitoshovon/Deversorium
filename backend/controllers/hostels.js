import hostelModel  from "../models/hostel.js";

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
        await newHostel.save();
        res.status(201).json(newHostel);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}