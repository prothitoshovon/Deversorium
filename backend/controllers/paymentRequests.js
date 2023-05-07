import mongoose from "mongoose";
import paymentRequestModel from "../models/paymentRequest.js";

export const getPaymentRequests = async (req,res)=>{
    try{
        const paymentRequests = await paymentRequestModel.find();
        console.log(paymentRequests);
        res.status(200).json(paymentRequests);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getPaymentRequestsByHostelId = async (req,res)=>{
    const hid = req.params.hid;
    try{
        const paymentRequests = await paymentRequestModel.find({hostel_id: hid});
        console.log(paymentRequests);
        res.status(200).json(paymentRequests);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getPaymentRequestsByUserId = async (req,res)=>{
    const uid = req.params.uid;
    try{
        const paymentRequests = await paymentRequestModel.find({user_id: uid});
        console.log(paymentRequests);
        res.status(200).json(paymentRequests);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createPaymentRequest = async (req,res)=>{
    const paymentRequest = req.body;
    const newPaymentRequest = new paymentRequestModel(paymentRequest);
    try{
        await newPaymentRequest.save();
        res.status(201).json(newPaymentRequest);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePaymentRequest = async (req,res)=>{
    const { id: _id} = req.params;
    const paymentRequest = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No requests for payments with that ID');
    }

    const updatedPaymentRequest = await paymentRequestModel.findByIdAndUpdate(_id, {...paymentRequest, _id}, {new: true});
    res.json(updatedPaymentRequest);
}

export const deletePaymentRequest = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No requests for payments with that ID');
    }

    await paymentRequestModel.findByIdAndRemove(id);

    res.json('Payment Request Deleted Successfully');
}
