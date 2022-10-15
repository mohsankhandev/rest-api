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

const refrshschema= new mongoose.Schema({

    token: {
        type: String,
        unique: true
    }

},{timestamps:false})

const refreshtoken= mongoose.model('refreshtoken', refrshschema )

module.exports = refreshtoken;