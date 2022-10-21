
import mongoose, { get } from 'mongoose'
const { required } = require('nodemon/lib/config');
import dotenv from 'dotenv'

const Pdoductschema= new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price:{
        type:String,
        required:true
    },

    size:{  type:String ,required:true },




    image:{
        type:String,
        required:true,
        get: (image)=>{
        // convert into url attach our domain name     uploads\1666188511706.png
         return `${process.env.APP_URL_IMG}/${image}`

        }

    },


},{timestamps:true , toJSON : {getters : true} , id: false})

const Product= mongoose.model('Product', Pdoductschema )
export default  Product;