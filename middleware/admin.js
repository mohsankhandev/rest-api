import User from "../model/User"
import Customerrorh from "../service/customerrorh";

    
    const admin = async (req,res,next)=>{
       
       //data base query start
        try{
            //query in data base
            const userm = await User.findOne({_id: req.user})
            // req.user.id ya hama auth middle ware sa mill raha jo es ka route pa lgaya ha ham na 
            console.log("line 12 what in user detals",userm.role)

            if(userm.role === 'nokar'){
                console.log('admin.js line 14 ',userm.role)
               return next();
                //next(); next middle ware ku ab call karo 
            }else{
                //agar user ka role admin nahi ha to 
                //ham yaha sa error retun kara ga 
                return next(Customerrorh.unauthorized("user not a admin"))
            }

        //catch block of data base 
        }catch(error)
        {
          // agar data base ma koi problem ayi to server error ku call kara gai
          return next(Customerrorh.server("server error from admin.js"))
        }
       //data base query end 

       
    }

    export default admin;