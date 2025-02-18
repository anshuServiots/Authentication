import express from "express"
import {handelCreateAccount} from "../controller/index"

const router = express.Router()

router.post('/createAccount' , handelCreateAccount)

export default router