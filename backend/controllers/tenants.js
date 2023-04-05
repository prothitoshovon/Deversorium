import tenantModel  from "../models/hostel.js";

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