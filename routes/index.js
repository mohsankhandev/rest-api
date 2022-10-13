import  express  from "express";
import loginController from "../controller/LoginController";
import registercontroller from "../controller/registercontroller";

const router = express.Router();

router.post('/register' , registercontroller.register);
router.post('/login' , loginController.login);


export default router;
//es ku serverma import kara ga 




// router.post('/register' , (req, res, next)=>{

// });