import { PrismaClient } from "@prisma/client"
import "dotenv/config"

const prisma = new PrismaClient()

async function createAccount(userName : string , userEmail : string , userPassword : string){

    return await prisma.user.create({
        data:{
            userName,
            userEmail,
            userPassword
        }
    })

}

async function isUserExist(userEmail : string){

    return await prisma.user.findMany({
        where:{
            userEmail,
            isDeleted : false
        }
    })
}

async function createRefreshToken(userId : string){
    
    return await prisma.refreshToken.create({
        data:{
            userId
        }
    })
}

async function isUserExistForLogin(userId: string) {
    return await prisma.user.findUnique({

        where: {
            userId ,
            isDeleted : false
        }
    })
}
export {isUserExist , createAccount, createRefreshToken, isUserExistForLogin}