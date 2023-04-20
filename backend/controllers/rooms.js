import mongoose from 'mongoose';
import roomModel from '../models/room.js';
import tenantModel from '../models/tenant.js';

export const getRooms = async (req,res)=>{
    try{
        const rooms = await roomModel.find();
        console.log(rooms);
        res.status(200).json(rooms);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getEmptyRooms = async(req,res)=>{
    try{
        const emptyRooms = await roomModel.find({
            next_vacancy_date:{
                $lt: new Date('3000-01-01')
            }
        }).sort({next_vacancy_date:1});
        console.log('empty rooms sir')
        console.log(emptyRooms);
        res.status(200).json(emptyRooms);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const bookRoom = async(req,res)=>{
    const rid = req.params.id;
    const uid = req.params.uid;
    try{
        const room = await roomModel.findById(rid);
        const vacancy_date = room.next_vacancy_date;
        const bookedRoom = await roomModel.findByIdAndUpdate(
            rid,
            { $set: { next_vacancy_date: new Date("3000-01-01"), tenant_id: uid} },
            { new: true },
            (err, doc) => {
                if (err) {
                    console.log("Error:", err);
                } else {
                    console.log("Updated document:", doc);
                }
            }
            );
        const bookedTenant = await tenantModel.updateOne({ user_id: uid },
             { $set: { assigned_room: true, room_id: rid, starting_date: vacancy_date } });
        res.json(bookedRoom);
    } catch (error) {
        console.log(error.message);
    }
           
    res.json(bookedRoom);  
}


export const createRoom = async (req,res)=>{
    const room = req.body;
    const newRoom = new roomModel(room);
    try{
        console.log(room.next_vacancy_date)
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updateRoom = async (req,res)=>{
    const { id: _id} = req.params;
    const room = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No room with that ID');
    }

    const updatedRoom = await roomModel.findByIdAndUpdate(_id, {...room, _id}, {new: true});
    res.json(updatedRoom);
}

export const deleteRoom = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No room with that ID');
    }

    await roomModel.findByIdAndRemove(id);

    res.json('Room Deleted Successfully');
}

export const getRoomsByRoomId = async (req,res)=>{
    const id = req.params.id;
    try{
        const rooms = await roomModel.find({_id: id});
        console.log(rooms);
        res.status(200).json(rooms);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}