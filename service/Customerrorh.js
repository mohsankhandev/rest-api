class Customerrorh extends Error{

    constructor(status,message){
        super();
        this.status = status;
        this.message = message;


    }

    static alreadyexit(message){
        return  new Customerrorh(409,message)

    };

    static wrongCretutanal(message ="username or email is wrong!"){
        return  new Customerrorh(401,message)

    };

    static unauthorized(message ="unautorized token send to data base "){
        return  new Customerrorh(401,message)

    }

    static ntfound(message ="user not found "){
        return  new Customerrorh(404,message)

    }
}

export default Customerrorh;