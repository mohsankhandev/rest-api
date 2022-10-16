import  express  from "express";
import loginController from "../controller/LoginController";
import RefreshController from "../controller/RefreshController";
import registercontroller from "../controller/registercontroller";
import UserController from "../controller/UserController";
import auth from "../middleware/auth";

const router = express.Router();

router.post('/register' , registercontroller.register);
router.post('/login' , loginController.login);

router.get('/me' ,auth, UserController.me);
router.post('/refresh' , RefreshController.refresh);




export default router;
//es ku serverma import kara ga 




// router.post('/register' , (req, res, next)=>{

// });