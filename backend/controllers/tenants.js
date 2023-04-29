import mongoose from 'mongoose';
import tenantModel  from '../models/tenant.js';

export const getTenants = async (req,res)=>{
    try{
        const tenants = await tenantModel.find();
        console.log(tenants);
        res.status(200).json(tenants);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createTenant = async (req,res)=>{
    const tenant = req.body;
    const newTenant = new tenantModel(tenant);
    try{
        await newTenant.save();
        res.status(201).json(newTenant);
    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updateTenant = async (req,res)=>{
    const { id: _id} = req.params;
    const tenant = req.body;
    console.log(tenant)
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No tenant with that ID');
    }

    const updatedTenant = await tenantModel.findByIdAndUpdate(_id, {...tenant, _id}, {new: true});
    res.json(updatedTenant);
}

export const deleteTenant = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No tenant with that ID');
    }

    await tenantModel.findByIdAndRemove(id);

    res.json('Tenant Deleted Successfully');
}

export const getTenantsByUserId = async (req,res)=>{
    const id = req.params.id;
    try{
        
        const tenants = await tenantModel.findOne({user_id: id});
        console.log(tenants);
        res.status(200).json(tenants);
    } catch(error){
        res.status(404).json({message: error.message});
    }
}
