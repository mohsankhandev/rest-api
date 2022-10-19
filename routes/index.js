import  express  from "express";
import loginController from "../controller/LoginController";
import ProductController from "../controller/ProductController";
import RefreshController from "../controller/RefreshController";
import registercontroller from "../controller/registercontroller";
import UserController from "../controller/UserController";
import auth from "../middleware/auth";

const router = express.Router();

router.post('/register' , registercontroller.register);
router.post('/login' , loginController.login);

router.get('/me' ,auth, UserController.me);
router.post('/refresh' , RefreshController.refresh);
router.post('/logout' ,auth, loginController.logout);  
router.post('/product' , ProductController.store); 






export default router;
//es ku serverma import kara ga 




// router.post('/register' , (req, res, next)=>{

// });