import {ValidationError} from 'joi'
import Customerrorh from '../service/customerrorh';
import dotenv from 'dotenv';

dotenv.config();


const errorhandlor = (err)=>{

    const stauscode= 500;
    let data ={
        message: "internal server error ",
        ...(process.env.DEBUG_MODE === true  && {originalerror: err.message})
        // agar DEBUG_MODE true huwa to aga ki condition run hu g 
        // originalerror: err.message
    };

    //chk lgaya ha jo erro 

    if (err instanceof ValidationError){

        stauscode = 422;
        data ={
            message: err.message
        }

//        stauscode = 422; validation error code   over ride kar raha opar wala status 


     //ValidationError ya ek class ha interface ha    
    //jo object recieve hu raha wokissclassya function ka ha instanceof 
    // ya jo error mill rahi wo ValidationError es classka instance ha kia 
    //ya joi libarary hama da g 
};
if(err instanceof Customerrorh){

    stauscode = err.status;
    data ={
        message: err.message
    }
}
return res.status(stauscode).json({data})


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
