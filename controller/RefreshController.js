import Joi from "joi";
import refreshtoken from "../model/refresh";
import Customerrorh from "../service/customerrorh";
import Jwtservice from "../service/jwtservice";
import User from '../model/User';
import dotenv from 'dotenv';

dotenv.config()


const RefreshController = {
    async refresh(req,res,next) {

        // const refreshschema = Joi.object({
        //     rftoken: Joi.string(),
        // });
        // //errror agar aya 
        // const { error } = refreshschema.validate(req.body)

        // if (error) {
        //     return next(error)
        // }

        //data base 
        let reft
        console.log(req.body.rftoken)

        try {

            reft = await refreshtoken.findOne({ token: req.body.rftoken })
            console.log(reft)

            if (!reft) {
               // return next(Customerrorh.unauthorized('invalid token'))
                return next(Customerrorh.unauthorized())
            }


           let  userid

            try {

                const { _id } = Jwtservice.verify(refreshmoken.token, process.env.JWTRF_Service);

                userid = _id;

            } catch (error) {
               // return next(Customerrorh.unauthorized('invalid token'))
               return next(Customerrorh.unauthorized())


            }

            const user = User.findOne({ _id: userid })
            if (!user) {
               // return next(Customerrorh.unauthorized('no user found'))
               return next(Customerrorh.unauthorized())


            }


            accetoken = Jwtservice.sign({ _id: user._id, role: user.role })
            rftoken = Jwtservice.sign({ _id: user._id, role: user.role }, '1y', process.env.JWTRF_Service)
            //white list in data base this refreh token


            await refreshtoken.create({ token: rftoken })

            console.log(`hello its from refresh token  ${accetoken}  ${rftoken}`)





            res.json({ accetoken: accetoken, rftoken: rftoken })









        } catch (error) {
          //  return next(Customerrorh.unauthorized(' no user found'))
          return next(Customerrorh.unauthorized())


        }


    }
}

export default RefreshController;