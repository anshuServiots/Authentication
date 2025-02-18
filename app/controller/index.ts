import { Request , Response } from "express";
import { checkValidation } from "../helper/index"
import { createAccount, isUserExist} from "../repository/index"

async function handelCreateAccount(req : Request , res : Response){

    try{

        checkValidation(req)

        const userName : string = req?.body?.userName
        const userEmail : string = req?.body?.userEmail
        const userPassword : string = req?.body?.userPassword

        const userInfonInDb = await isUserExist(userEmail);

        let dataSendAfterExicutingQuerry: any

        if (userInfonInDb.length == 0){
            const hashedPassword = await hashPassword(userPassword)
            dataSendAfterExicutingQuerry = await createAccount(userName, userEmail, hashedPassword)
        }
        else {
            throw {
                "status": 400,
                    message: 'account with this email already exist'
            }
        }

        //console.log('dataSendAfterExicutingQuerry' ,dataSendAfterExicutingQuerry)
        const dataToSend = {
            userId: dataSendAfterExicutingQuerry.userId,
            userName: dataSendAfterExicutingQuerry.userName,
        }

        defaultRes(res, 201, 'account created successfully ✌️✌️✌️✌️', null, dataToSend)
        // res.status(200).json({res : dataToSend })


    }

    catch(error){

    }
    
}

export  {handelCreateAccount}