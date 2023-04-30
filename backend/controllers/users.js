import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import tenantModel from '../models/tenant.js';
import ownerModel from '../models/owner.js';
export const signin = async (req, res) => {
    const {email, password, role} = req.body;

    try{
        
        const existingUser = await UserModel.findOne({email: email});

        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."});
        
        const token = jwt.sign({email: existingUser.email, id: existingUser._id, role: existingUser.role}, process.env.TEST_TOKEN, {expiresIn: '1h'});

        res.status(200).json({result: existingUser, token});
    } catch(error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
}

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName, role, phone} = req.body;

    try{
        const existingUser = await UserModel.findOne({email: email, role: role});

        if(existingUser) return res.status(404).json({message: "User already exists."});
        
        if(password !== confirmPassword) return res.status(404).json({message: "Passwords don't match."});
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const result = await UserModel.create({email: email, password: hashedPassword, name: `${firstName} ${lastName}`, role: role, phone: phone});
       
        if(role===1)
        {
            const tenant = await tenantModel.create({user_id: result._id});
        }
        else if(role==2)
        {
            const owner = await ownerModel.create({user_id: result._id});
        }
        const token = jwt.sign({email: result.email, id: result._id, role: result.role}, process.env.TEST_TOKEN, {expiresIn: '1h'});

        res.status(200).json({result, token});
    } catch(error) {
        res.status(500).json({message: 'Something went wrong.'});
    }   
}

export const getuserbyemail = async(req, res) => {
    const {email} = req.body;
    try{
        console.log(email)
        const existingUser = await UserModel.findOne({email: email});

        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});

        res.status(200).json(existingUser);
    } catch(error) {
        res.status(500).json({message: 'Something went wrong.'});
    }  
}

export const getuserbyuserid = async(req,res) => {
    const {id} = req.params;
    try {
        const user = await UserModel.findOne({_id: id});

        if(!user)
        {
            return res.status(404).send('No users with that ID');
        }
        res.status(200).json(user);
    } catch(error) {  
        res.status(404).json({message: error.message});
    }
}

export const updateuser = async (req,res)=>{
    const _id = req.params.uid;
    const user = req.body;
    console.log(_id)
    console.log(user)
    const foundUser = await UserModel.findOne({_id: _id});
    if(!foundUser)
    {
         return res.status(404).send('No users with that ID');
    }
    const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.password);

    if(!isPasswordCorrect) return res.status(400).json({message: "Incorrect password."});

    const updatedUser = await UserModel.findByIdAndUpdate(_id, {...user, _id}, {new: true});
    res.json(updatedUser);
}