import  express  from "express";
import loginController from "../controller/LoginController";
import registercontroller from "../controller/registercontroller";
import UserController from "../controller/UserController";
import auth from "../middleware/auth";

const router = express.Router();

router.post('/register' , registercontroller.register);
router.post('/login' , loginController.login);

router.get('/me' ,auth, UserController.me);



export default router;
//es ku serverma import kara ga 




// router.post('/register' , (req, res, next)=>{

// });