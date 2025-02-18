import {body} from "express-validator"

const validateCreateAccountReq  = [
    body('userName').notEmpty().trim().withMessage('pls send user name') ,
    body('userName').isLength({min : 5 , max : 30}).withMessage('userName size should be between 5 and 30') ,
    
    body('userEmail').notEmpty().withMessage('pls send user email') ,
    body('userEmail').isEmail().trim().withMessage('pls send valid email') ,
    
    body('userPassword').notEmpty().withMessage('pls send user password') ,
    body('userPassword').isLength({min : 5 , max : 30}).trim().withMessage('userName size should be between 5 and 30') , 
]

const validateUserLoginReq  = [
   
    body('userId').notEmpty().trim().withMessage('pls send user Id') ,
    body('userId').isLength({min : 5 , max : 100}).withMessage('pls send valid id') ,
    
    body('userPassword').notEmpty().trim().withMessage('pls send user password') ,
    body('userPassword').isLength({min : 5 , max : 30}).withMessage('userName size should be between 5 and 30') ,
]

export  {validateCreateAccountReq , validateUserLoginReq }

