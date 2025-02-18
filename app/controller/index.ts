import { Request , Response } from "express";

function handelCreateAccount(req : Request , res : Response){

    const userName : string = req?.body?.userName
    const userEmail : string = req?.body?.userEmail
    const userPassword : string = req?.body?.userPassword

    console.log(userName , userEmail , userPassword)
}

export  {handelCreateAccount}