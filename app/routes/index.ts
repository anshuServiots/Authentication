import express from "express"
import {handelCreateAccount , handelUserLogin, handelVerifyAccessToken} from "../controller/index"
import {validateCreateAccountReq , validateUserLoginReq} from "../util/index"

const router = express.Router()

router.post('/createAccount', validateCreateAccountReq, handelCreateAccount)
router.post('/login', validateUserLoginReq, handelUserLogin)
router.post('/verifyAccessToken',  handelVerifyAccessToken)

export default router