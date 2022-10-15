import User from "../model/User";
import Customerrorh from "../service/customerrorh";

const UserController ={
    
    async me(req,res,next){

//data base query 
try {
const user = await User.findOne({_id : req.user._id})

if(!user){
    return next(Customerrorh.ntfound())
}

res.json(user)

} catch (error) {

    return next(error)
    
}

    }
}

export default UserController;