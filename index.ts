import express from "express"
import router from "./app/routes"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/' , router)

// app.get("/set-cookie", (req, res) => {
//     res.cookie("token", "your_value_here", {
//       httpOnly: true, // Prevents JavaScript from accessing it
//       secure: true, // Only sent over HTTPS (remove in local dev)
//       sameSite: "strict", // Prevents CSRF attacks
//     });
//     res.json({ message: "Cookie set!" });
//   });


//   app.get("/check-cookie", (req, res) => {
//     console.log(req.cookies); // Logs cookies in the server console
//     res.json({ cookies: req.cookies });
//   });
app.listen(3002 , ()=>{
    console.log("server is running on port 3002")
})
