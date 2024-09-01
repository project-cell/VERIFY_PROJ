import express from 'express';
const app = express();

const router = express.Router();
//const PORT = 3000;
import mongoose from 'mongoose';
import dotenv from'dotenv';
import userroutes from './routes/user.routes.js';//routes
import authroutes from './routes/auth.route.js';//routes
dotenv.config();

const mongoURL= 'mongodb://localhost:27017/Authentication';
mongoose.connect(mongoURL,{ })

const db = mongoose.connection;

db.on("connected",()=>{
    console.log('connected to MongoDb server');
})
db.on("disconnected",()=>{
    console.log('disconnected to MongoDb server',);
})
db.on("error",(error)=>{
    console.log('error in MongoDb server',error);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port 3000`);
  });
app.use(express.json());
app.use('/backend/user', userroutes);//userroutes use
app.use('/backend/auth',authroutes);// authroutes use
app.use((err,req,res,next)=>{
    const statuscode =err.statuscode ||500;
    const message= err.message || 'internal server error';
    return res.status(statuscode).json({
        success: false,
        message,
        statuscode
    });
});
