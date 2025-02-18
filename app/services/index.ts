import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function hashPassword(plainPassword: string) {
    const saltRound : number= 10;
    const hashedPassword: string = await bcrypt.hash(plainPassword, saltRound)
    return hashedPassword
}


async function unHashPassword(plainPassword: string, hashedPassword : string) {
    const ans = await bcrypt.compare(plainPassword, hashedPassword)
    return ans;
}

interface dataToMakeToken{
    userId : string,
    userEmail : string ,
    userName : string , 
    userType : String,
}


const secretKey = '12345'

function makeToken(data : dataToMakeToken){
    const token = jwt.sign(data , secretKey , {expiresIn : '100s'})
    return token;
}

function verifyToken(token : any){
    try{
        const ans = jwt.verify(token , secretKey)
        return ans
    }
    catch(error){
        return 0;
    }  
}


export { hashPassword, unHashPassword ,  verifyToken , makeToken, dataToMakeToken}