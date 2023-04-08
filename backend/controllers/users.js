import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const {_email, _password, _role} = req.body;

    try{
        const existingUser = await User.findOne({email: _email, role: _role});

        if(!existingUser) return res.status(404).json({message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(_password, existingUser.password);
        
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id, role: existingUser.role}, process.env.TEST_TOKEN, {expiresIn: '1h'});

        res.status(200).json({result: existingUser, token});
    } catch(error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
}

export const signup = async (req, res) => {
    const {_email, _password, confirmPassword, firstName, lastName, _role} = req.body;

    try{
        const existingUser = await User.findOne({email: _email, role: _role});

        if(existingUser) return res.status(404).json({message: "User already exists."});

        if(_password !== confirmPassword) return res.status(404).json({message: "Passwords don't match."});
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email: _email, password: hashedPassword, name: firstName + ' ' + lastName, role: _role});

        const token = jwt.sign({email: result.email, id: result._id, role: result.role}, process.env.TEST_TOKEN, {expiresIn: '1h'});

        res.status(200).json({result, token});
    } catch(error) {
        res.status(500).json({message: 'Something went wrong.'});
    }   
}