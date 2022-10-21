import Customerrorh from "../service/customerrorh";
import Jwtservice from "../service/jwtservice";

const auth = async (req, res, next) => {

    // es ka andar authorization header ku getkara ga us ka andar token ha

    //req.header request pa jitna b header send kara ga womill jaya ga 
    // es ka andar ek property mja chahya jo ham na baji ha wo chahya    req.header.authorization
    const authheader = req.headers.authorization;
    console.log(authheader)

    //agar header baja hi nahi ha to 
    if (!authheader) {
        //token nahi baja ha user esku accesnahi kar saka ga 
        return next(Customerrorh.unauthorized())
    };

    //agar header to code yaha aya ga c
    //.split() ya method string ku splite karti ha alag alag  or us ku array mastore karti ha
    const token = authheader.split(" ")[1];
    console.log("token coming from line 22 auth.js",token)

    try {

        const { _id, role } = Jwtservice.verify(token);

        const user = {
            _id,
            role,
        }
        
        req.user = user;

        console.log("auth line 34",req.user)

        next()

    } catch (error) {

        return next(Customerrorh.unauthorized())

    }


}

export default auth;