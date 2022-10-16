import Joi from "joi";
import User from "../model/User";
import Customerrorh from "../service/customerrorh";
import bcrypt from 'bcrypt'
import Jwtservice from "../service/jwtservice";
//E:\appppp\Node Js Course B\rest-api\node_modules\bcrypt



const loginController={

   async login(req,res,next){

    const loginschema=Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('[a-zA-z0-9]{3,30}$')).required(),          
    });
    //errror agar aya 
    const {error} = loginschema.validate(req.body)
    if (error){
        return next(error)
    } 

    //if user already in db
    try {
        const   user = await User.findOne({email: req.body.email  })

        if (!user){
            return next(Customerrorh.wrongCretutanal("email is incorrect "))
        }
         console.log(user)
        //if useer here in db now compare password
        console.log(user.password)
        console.log(req.body.password)
       const match = await bcrypt.compare(req.body.password, user.password )

       if (!match){
        return next(Customerrorh.wrongCretutanal("please enter correct password "))
         }

         //token generate 
        const  accetoken =Jwtservice.sign({_id : user._id ,role: user .role})
           console.log(`hello its from login  ${accetoken}`) ;
           
           res.json({accetoken})


        
    } catch (error) {
            return next(error)
        
    }

    }
}

export default loginController;

//es object bnaya const loginController={}
//us ka anadar login function bnaya login(){}

  