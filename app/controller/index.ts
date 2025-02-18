import { Request , Response } from "express";
import { checkValidation } from "../helper/index"
import { createAccount, isUserExist ,createRefreshToken, isUserExistForLogin} from "../repository/index"
import { hashPassword , unHashPassword,  verifyToken , makeToken, dataToMakeToken } from "../services";
import { defaultRes } from "../util";

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

        const dataToSend = {
            userId: dataSendAfterExicutingQuerry.userId,
            userName: dataSendAfterExicutingQuerry.userName,
        }

        defaultRes(res, 201, 'account created successfully ', null, dataToSend)
    }

    catch(error){
        console.log(error)
        defaultRes(res, 400, 'err in creating account', error, null)
    }
    
}
async function handelUserLogin(req : Request , res : Response){

    try{

        checkValidation(req)

        const userEmail : string = req?.body?.userEmail
        const userPassword : string = req?.body?.userPassword

        const isUserExistRes = await isUserExist(userEmail)
        
        if (isUserExistRes.length == 0){
            throw { 
                "status": 400,
                message : 'account with this email dosent exist 😥😥😥😥😥'
            }
        }

        const isPasswordCorrect = await unHashPassword(userPassword , isUserExistRes[0]?.userPassword)

        if(isPasswordCorrect){

            const refreshToken = await createRefreshToken(isUserExistRes[0].userId)
            console.log('refreshToken created' , refreshToken)

            const dataToSendToMakeToken : dataToMakeToken = {
                userId  :isUserExistRes[0]?.userId,
                userEmail : isUserExistRes[0]?.userName,
                userName : isUserExistRes[0]?.userName,
                userType : 'standard' 
            }

            const accessToken = await makeToken(dataToSendToMakeToken)
            console.log("access token =" , accessToken)
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true, // Prevents JavaScript from accessing it
                secure: true, // Only sent over HTTPS (remove in local dev)
                sameSite: "strict", // Prevents CSRF attacks
              });
            res.json({ accessToken: accessToken});
           
        }
        else{
            throw { 
                "status": 400,
                message : 'wrong password 😥😥😥😥😥'
            }
        }
        

        const userInfonInDb = await isUserExist(userEmail);

        if(!userInfonInDb[0]){
            throw {
                "status": 400,
                message: 'wrong email or password'
            }
        }

        let dataSendAfterExicutingQuerry: any

       

        // if (userInfonInDb.length == 0){
        //     const hashedPassword = await hashPassword(userPassword)
        //     dataSendAfterExicutingQuerry = await createAccount(userName, userEmail, hashedPassword)
        // }
        // else {
        //     throw {
        //         "status": 400,
        //             message: 'account with this email already exist'
        //     }
        // }

        // const dataToSend = {
        //     userId: dataSendAfterExicutingQuerry.userId,
        //     userName: dataSendAfterExicutingQuerry.userName,
        // }

        // defaultRes(res, 201, 'account created successfully ', null, dataToSend)
    }

    catch(error){
        console.log(error)
        defaultRes(res, 400, 'err in logging in', error, null)
    }
    
}


async function handelVerifyAccessToken(req : Request , res:Response){

    const tokenToVerify = req.body.token;

    if(!tokenToVerify){
        res.status(400).json({msg : "InValid token"})
    }

    const isTokenValid = verifyToken(tokenToVerify)

    console.log(isTokenValid)
    if(isTokenValid){
        res.status(200).json({msg : "valid token"})
    }
    else{
        
        res.status(400).json({msg : "InValid token"})   
    }
}
export  {handelCreateAccount , handelUserLogin , handelVerifyAccessToken}