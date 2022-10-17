import Joi from "joi";
import refreshtoken from "../model/refresh";
import Customerrorh from "../service/customerrorh";
import Jwtservice from "../service/jwtservice";
import User from '../model/User';
import dotenv from 'dotenv';

dotenv.config()


const RefreshController = {
    async refresh(req,res,next) {

        const refreshschema = Joi.object({
            rftoken: Joi.string(),
        });
        //errror agar aya 
        const { error } = refreshschema.validate(req.body)

        if (error) {
            return next(error)
        }

        //data base 
        console.log("ya refresh sa line 26 sa a" ,req.body.rftoken)

        let reft
        try {

            reft = await refreshtoken.findOne({ token: req.body.rftoken })
            console.log(reft)

            if (!reft) {
               // return next(Customerrorh.unauthorized('invalid token'))
                return next(Customerrorh.unauthorized("rong token send"))
            }


           let userid;

            try {

                const { _id } = Jwtservice.verify(req.body.rftoken, process.env.JWTRF_Service);

                userid = _id;
               console.log("liene 46 refesh   ",userid)

            } catch (error) {
               // return next(Customerrorh.unauthorized('invalid token'))
               return next(Customerrorh.unauthorized("not found token in database"))
         }

            let user =await User.findOne({ _id: userid })
            console.log("lin e 54",user)
            if (!user) {
               // return next(Customerrorh.unauthorized('no user found'))
               return next(Customerrorh.unauthorized("es token ka sath koi user nahi ha "));


            }

          let  accetoken = Jwtservice.sign({ _id: user._id, role: user.role })
          let  rftoken = Jwtservice.sign({ _id: user._id, role: user.role }, '1y', process.env.JWTRF_Service)
            console.log(accetoken)
            //white list in data base this refreh token


            await refreshtoken.create({ token: rftoken })

            console.log(`hello its from refresh token  ${accetoken}  ${rftoken}`)





            res.json({ accetoken: accetoken, rftoken: rftoken })









        } catch (error) {
          //  return next(Customerrorh.unauthorized(' no user found'))
          return next(Customerrorh.unauthorized("user not here last"))


        }


    }
}

export default RefreshController;