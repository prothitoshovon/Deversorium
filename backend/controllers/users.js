import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/user.js';

export const signin = async (req, res) => {
    const {email, password, role} = req.body;

    try{
        const existingUser = await UserModel.findOne({email: email, role: role});

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
        console.log('works 1')
        const result = await UserModel.create({email: email, password: hashedPassword, name: `${firstName} ${lastName}`, role: role, phone: phone});
        console.log('works 2')
       
        const token = jwt.sign({email: result.email, id: result._id, role: result.role}, process.env.TEST_TOKEN, {expiresIn: '1h'});

        res.status(200).json({result, token});
    } catch(error) {
        res.status(500).json({message: 'Something went wrong.'});
    }   
}