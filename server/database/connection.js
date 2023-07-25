const mongoose=require("mongoose");
const dotenv =require("dotenv");
dotenv.config({path:'config.env'})
const MONGO_URI=process.env.MONGO_URI

const connectDB=()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI);
    const db=mongoose.connection
    db.on("error",(err)=>{
        console.log(err);
    })
    db.once("open",()=>{
        console.log("Connection established");
    
    });
}



module.exports=connectDB
