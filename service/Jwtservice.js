//import JWT_Service from '../config'
import  Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class Jwtservice {
    static sign(payload, expiry = '60', secret = process.env.JWT_Service){
        return Jwt.sign(payload, secret, {expiresIn:expiry})

    }
}

export default Jwtservice;