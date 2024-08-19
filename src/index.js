// require('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/indexDB.js";
// import app from "./app.js";
import express from "express"
const app= express()

dotenv.config({
    path:"./env"
})
app.get("/",(req,res)=>{
    res.send("server is started")
});
app.get("/login",(req,res)=>{
    res.send("<h1>this is login page</h1>")
});


// this is for databace
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mogodb connetion failed",err)
    
})




















/*
import express from "express"
const app = express()

(async () => {
    try {

        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("Error:",error)
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}.`);
        })
    } catch (error) {
        console.log("Error: " + error);
        throw err

    }
})()
*/
