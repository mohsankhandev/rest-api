
import mongoose from 'mongoose'
const { required } = require('nodemon/lib/config')

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
        required:true

    },


},{timestamps:true})

const Product= mongoose.model('Product', Pdoductschema )
export default  Product;