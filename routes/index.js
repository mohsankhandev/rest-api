import  express  from "express";
import loginController from "../controller/LoginController";
import ProductController from "../controller/ProductController";
import RefreshController from "../controller/RefreshController";
import registercontroller from "../controller/registercontroller";
import UserController from "../controller/UserController";
import admin from "../middleware/admin";
import auth from "../middleware/auth";


const router = express.Router();

router.post('/register' , registercontroller.register);
router.post('/login' , loginController.login);

router.get('/me' ,auth, UserController.me);
router.post('/refresh' , RefreshController.refresh);
router.post('/logout' ,auth, loginController.logout);  
router.post('/product',[auth, admin], ProductController.store); 
router.put('/product/:id',[auth, admin], ProductController.updatem); 
router.delete('/product/:id',[auth, admin], ProductController.destroy);
router.get('/product', ProductController.getallproduct); 
router.get('/product/:id', ProductController.singleproduct); 










export default router;
//es ku serverma import kara ga 




// router.post('/register' , (req, res, next)=>{

// });