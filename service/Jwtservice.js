//import JWT_Service from '../config'
import  Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class Jwtservice {
    static sign(payload, expiry = '60000000', secret = process.env.JWT_Service){
        return Jwt.sign(payload, secret, {expiresIn:expiry})

    };
    ////////////////////////////////////////////
    static verify(token, secret = process.env.JWT_Service){
        return Jwt.verify(token, secret)

    }
}

export default Jwtservice;