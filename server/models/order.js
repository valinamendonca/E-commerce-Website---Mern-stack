const mongoose=require("mongoose");
const Schema=mongoose.Schema

const item=new Schema({
    id: { type: String },
    items: [
        {
          type: { type: String },
          diameter: { type: Number },
          length: { type: Number },
          total: { type: Number },
          q: { type: Number },
          price: { type: Number, default: 0 },
          totalPrice: {type: Number, default: 0 }
        },
      ],
      totalAmount: {type: Number, default: 0 },
      req: { type: String },
      OrderDate: {
        type: Date,
      },
      deliveryDate: {
        type: Date,
      },
      status: {
        type: String,
        default: 'Pending'
      },
      paid:{
        type: Boolean,
        default: false,
      },
      grandTotal: {
        type: String, default: 0
      }
},{timestamps:true});

const itemModel=mongoose.model("order",item)
module.exports=itemModel
