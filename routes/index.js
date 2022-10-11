import  express  from "express";
import registercontroller from "../controller/registercontroller";

const router = express.Router();

router.post('/register' , registercontroller.register);

export default router;
//es ku serverma import kara ga 




// router.post('/register' , (req, res, next)=>{

// });