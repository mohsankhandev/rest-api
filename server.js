import  express  from "express";
import mongoose from "mongoose";
//import { App_port,DB_URL } from "./config";
import errorhandlor from "./middleware/errorhandler";
import router from "./routes";
import dotenv from 'dotenv';
import path from 'path'

dotenv.config();

const app =express();




mongoose.connect('mongodb://127.0.0.1:27017/mohsan',{useNewUrlParser: true, useUnifiedTopology: true})
const db=mongoose.connection;
db.on('error', console.error.bind(console,'connection error '));
db.once('open',()=>{
    console.log('db connected ');
});




global.appRoute = path.resolve(__dirname);
app.use(express.urlencoded({extended:false}))
//json ku acept kar raha jo client sa a raha 
app.use(express.json())
//route ku applicatin kaanadar registerkarna hota ha 
app.use('/api', router);

//es ku app.listen ka opar h register karta ha 
app.use(errorhandlor);

app.listen(process.env.App_port,()=>{
    console.log(`server runing on port ${process.env.App_port}`)
}  )





/* basic server start 

import  express  from "express";
import { App_port } from "./config";

const app =express();




app.listen(App_port,()=>{
    console.log(`server runing on port ${App_port}`)
}  )


*/