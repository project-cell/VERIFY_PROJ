import { errorHandler } from '../../customerror/error.js';
import User from '../models/user.js';

export const signup = async (req,res,next)=>{
    
    const {username,email,password}=req.body;
    const newuser=new User({username,email,password});
    try{
        await newuser.save()
        res.status(201).json({message:"user created successfully"});    

    }catch(error)
    {
        next(errorHandler(300,'something went wrong'));
       // res.status(500).json({message:error.message});
    }
    


};