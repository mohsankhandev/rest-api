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

    }
}

export default Customerrorh;