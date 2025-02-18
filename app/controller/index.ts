import { Request , Response } from "express";
import { checkValidation } from "../helper/index"
function handelCreateAccount(req : Request , res : Response){

    try{

        checkValidation(req)

        const userName : string = req?.body?.userName
        const userEmail : string = req?.body?.userEmail
        const userPassword : string = req?.body?.userPassword

        
    }

    catch(error){

    }
    
}

export  {handelCreateAccount}