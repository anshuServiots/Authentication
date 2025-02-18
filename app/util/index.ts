import {body} from "express-validator"
import {Response} from "express"

const validateCreateAccountReq  = [
    body('userName').notEmpty().trim().withMessage('pls send user name') ,
    body('userName').isLength({min : 5 , max : 30}).withMessage('userName size should be between 5 and 30') ,
    
    body('userEmail').notEmpty().withMessage('pls send user email') ,
    body('userEmail').isEmail().trim().withMessage('pls send valid email') ,
    
    body('userPassword').notEmpty().withMessage('pls send user password') ,
    body('userPassword').isLength({min : 5 , max : 30}).trim().withMessage('userName size should be between 5 and 30') , 
]

const validateUserLoginReq  = [
    
    body('userEmail').notEmpty().withMessage('pls send user email') ,
    body('userEmail').isEmail().trim().withMessage('pls send valid email') ,
   
    body('userPassword').notEmpty().trim().withMessage('pls send user password') ,
    body('userPassword').isLength({min : 5 , max : 30}).withMessage('userName size should be between 5 and 30') ,
]

function defaultRes(
    res : Response,
    status : number,
    msg : string , 
    err ? : any,
    data ? : any
){
    return res.status(status).json({
        status : status ,
        message : msg,
        data : data || null ,
        err : err || null
    })
}

export  {validateCreateAccountReq , validateUserLoginReq, defaultRes }

