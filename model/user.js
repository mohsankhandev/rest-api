// import { string } from "joi";
// import mongoose from "mongoose";

 
// const schema = mongoose.Schema;

// //its blue prit of data how show  

// const userSchame = new schema({

//     // name: { type: string, required: true},
//     // date: { type: string },


//     // email: { type:string , required: true},
//     // password: { type:string , required: true},
//     // role: { type:string , default: 'customer'}

// }, {timestamps: true,});

// const Usersd = mongoose.model("User", userSchame)




// export default Usersd;


const mongoose=require('mongoose')
const { required } = require('nodemon/lib/config')

const Userschema= new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        default:"admin"

    },


},{timestamps:true})

const User= mongoose.model('User', Userschema )
module.exports = User;