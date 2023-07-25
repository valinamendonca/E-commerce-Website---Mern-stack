const mongoose = require("mongoose");
const Schema=mongoose.Schema

const deliverySchema = new Schema({
        quotationId: {
          type: Schema.Types.ObjectId,
          ref: 'orders',
          required: true
        },
        deliveryDate: {
          type: Date,
          required: true
        },
        status: {
          type: String,
          enum: ['Pending', 'Shipped', 'Delivered'],
          default: 'Pending'
        }
}, { timestamps: true });
      
const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports=Delivery
      