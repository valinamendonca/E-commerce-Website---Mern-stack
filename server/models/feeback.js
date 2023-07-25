const mongoose=require("mongoose");
const Schema=mongoose.Schema

const feedback=new Schema({
    email:{
        default: 'Anonymous',
        type: String  
    },
    review:{
        type: String
    }
}, {timestamps:true})

//compiling above scheme into a model
const fdbk=mongoose.model("feedback",feedback);
module.exports=fdbk
