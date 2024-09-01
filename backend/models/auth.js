import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//schema in database
const AuthSchema = new mongoose.Schema
({
    username :{
        type: String,
        required: true,//mandatory to fill
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile_number:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
},{timestamps:true});
AuthSchema.pre('save',async function (next){
    const person = this;
    // hash the password only when password is modified or new
    if(!this.isModified('password')) return next();
      //hash password generation
      try{
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password =hashedPassword;
        next();
    }catch(err){
        return next(err);

    }
})
AuthSchema.methods.comparePassword =async function(candidatePassword){
    try{

        const isMatch =await bcrypt.compare (candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

// create user model
const Auth = mongoose.model('auth',AuthSchema);
//module.exports = User;
export default Auth;
