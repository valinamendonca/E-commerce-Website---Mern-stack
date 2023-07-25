const mongoose = require("mongoose");
const Schema=mongoose.Schema

const item=new Schema({
        cname:String,
        cperson: String,
        cdesignation: String,
        cno: Number,
        address: String,
        email:String,
        pass:String,
})    

const itemModel=mongoose.model("user",item)
module.exports=itemModel
