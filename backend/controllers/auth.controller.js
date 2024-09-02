import { errorHandler } from '../../customerror/error.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const signup = async (req,res,next)=>{
    
    const {username,email,password}=req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newuser=new User({username,email,password: hashedPassword});
    try{
        await newuser.save()
        res.status(201).json({message:"user created successfully"});    

    }catch(error)
    {
        next(errorHandler(500,'something went wrong'));
       // res.status(500).json({message:error.message});
    }
};

export const signin = async (req,res,next)=>{
    
    const {email,password}=req.body;
    try{
        const validUser = await User.findOne({email})
        if(!validUser)
            return next(errorHandler(404,'User Not Found'))
        const validPassword = bcrypt.compareSync(password,validUser.password)
        if(!validPassword)
            return next(errorHandler(401,'Wrong Credentials'))
        const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const {password: hashedPassword,...rest} =validUser._doc;

        res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    }catch(error)
    {
        next(errorHandler(500,'something went wrong'));
      
    }
    


};