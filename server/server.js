const express=require("express");
const app=express();
const path=require("path");
const cors=require("cors");
const bodyParser = require('body-parser');

//port
const dotenv =require("dotenv");
dotenv.config({path:'config.env'})

/*
//view engine
app.set("view engine","ejs");

//app.use(express.static(path.join(__dirname,"assets/html")))
app.use(express.static(path.resolve(__dirname,"assets/css")))
//css/style.css
app.use(express.static(path.resolve(__dirname,"assets/js")))
app.use(express.static(path.resolve(__dirname,"assets/img")))

*/

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//load routes
app.use(cors());
app.use('/', require('./routes/route'));


//app.listen
const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
})


//Db Connection
const connectDB = require("./database/connection");
connectDB();



