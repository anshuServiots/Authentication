import express from "express"
import {handelCreateAccount} from "../controller/index"
import {validateCreateAccountReq , validateUserLoginReq} from "../util/index"

const router = express.Router()

router.post('/createAccount', validateCreateAccountReq, handelCreateAccount)

export default router