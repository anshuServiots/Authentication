import bcrypt from "bcrypt"
async function hashPassword(plainPassword: string) {
    const saltRound : number= 10;
    const hashedPassword: string = await bcrypt.hash(plainPassword, saltRound)
    return hashedPassword
}


async function unHashPassword(plainPassword: string, hashedPassword : string) {
    const ans = await bcrypt.compare(plainPassword, hashedPassword)
    return ans;
}

export { hashPassword, unHashPassword }