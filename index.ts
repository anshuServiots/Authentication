import express from "express"
import router from "./app/routes"
const app = express()

app.use(express.json())

app.use('/' , router)

app.listen(3002 , ()=>{
    console.log("server is running on port 3002")
})
