import {ValidationError} from 'joi'
import Customerrorh from '../service/customerrorh';

import dotenv from 'dotenv';

dotenv.config();


const errorhandlor = (err,req,res,next)=>{

    let stauscode = 510;
    let data ={
        message: "internal server error ",
       // ...(process.env.DEBUG_MODE === true  && {originalerror: err.message})
        
    };

    


if (err instanceof ValidationError){

    stauscode = 422;
    data ={
        message: err.message
    }
}

if(err instanceof Customerrorh){

    stauscode = err.status;
    data ={
        message: err.message
    }
}

return res.status(stauscode).json(data)


};
export default errorhandlor;

//4 para meter

    // first for recieve error we catch    :err: applicatin ma next ka anadar jo error baja ha wo yaha a jata ha es ma 

    //req
    //res
    //next    matlab ham next middle ware ku pass kar saka kuch 


    // es ka anadr status code define kara ga 500
    //dosra message user ku error ki information send kara ga clinet ku 
    //es ma origional error ku send kara ga originalerror:''
