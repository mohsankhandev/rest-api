import Joi from "joi";
import User from "../model/User";
import Customerrorh from "../service/customerrorh";
import bcrypt from 'bcrypt'
import Jwtservice from "../service/jwtservice";
import refreshtoken from "../model/refresh";

import dotenv from 'dotenv';
dotenv.config();

//import {Jwtservice} from '../service/Jwtservice'






const registercontroller={
    

 async   register(req,res, next ) {
    
    

        //validating schema 
        //const registerschema= Joi.object({})
        //   method chaining     name: Joi.string().min(3).max(30)
        const registerschema= Joi.object({
            name: Joi.string().min(3).max(30),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('[a-zA-z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });
        console.log(req.body)
        const {error} = registerschema.validate(req.body);

        if (error){
            return next(error);
        };



        //validate the request  
        //data jo a raha wo string ki forum ma a raha ha ya nahi jo password a raha wo valid ha ya nahi 

        //authorise request 
        //check if allready user id db

        try{
            const exit =await User.exists({email: req.body.email} )
            if(exit)
            {
                return next(Customerrorh.alreadyexit("this email is already taken"));
            }

        }catch(error){
            return next(error);

        };

        //hash password 
      const hasspassword = await bcrypt.hash(req.body.password, 10)
      const {name,email,password}=req.body;
      
      const user = new User(
        {
            name,
            email,
            password:hasspassword
          }
      )

      //save into db 
      let accetoken
      let rftoken
      
      try {
          const result  = await user.save();
          //token create JWTre_Service
           accetoken =Jwtservice.sign({_id : result._id ,role: result.role})
           rftoken =Jwtservice.sign({_id : result._id ,role: result.role},'1y',process.env.JWTRF_Service)
           //white list in data base this refreh token
           
          
          await refreshtoken.create({token:rftoken})  

           console.log(`hello its from register  ${accetoken}  ${rftoken}` )
      } 
      
      catch (error) {
        return next(error   )
      }

        res.json({accetoken:accetoken,rftoken:rftoken})

    }
}

export default registercontroller;