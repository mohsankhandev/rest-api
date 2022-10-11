class Customerrorh extends Error{

    constructor(status,mesg){
        super();
        this.status=status;
        this.mesg=mesg;


    }

    static alreadyexit(message){
        return  new Customerrorh(409,message)

    }
}

export default Customerrorh;