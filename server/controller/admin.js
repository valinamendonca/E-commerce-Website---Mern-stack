const order=require("../models/order")
const user=require("../models/user")
const feedback=require("../models/feeback")

const quo=(req,res)=>{
        order.find({},(err, documents) => {
                if (err) {
                        console.error('Error fetching documents:', err);
                } else {
                        res.send(documents);
                }
        })
}
const sendQuot=(req,res)=>{
        const id=req.body._id;
        order.updateOne(
                { _id: id },
                { $set: { items: req.body.items, totalAmount: req.body.totalAmount, totalPrice: req.body.totalPrice, grandTotal: req.body.grandTotal } }
        )
        .then((result) => {
                res.send("Saved");
        })
        .catch((error) => {
                console.error("Error updating document:", error);
        });
}

const paid=(req,res)=>{
        const id=req.body._id;
        const currentDate = new Date();
        const isoDateString = new Date(currentDate).toISOString();
        order.updateOne(
                { _id: id },
                { $set: { OrderDate: isoDateString, paid: true } }
        )
        .then((result) => {
                res.send("Saved");
        })
        .catch((error) => {
                console.error("Error updating document:", error);
        });

}

const orders=(req,res)=>{
        order.find({})
        .then((result)=>{
                res.send(result);
        })
        .catch((err)=>{
                console.log(err);
        })
}

const updateOrder=(req,res)=>{
        console.log(req.body);
        const id=req.body._id;
        order.findByIdAndUpdate(id,req.body)
        .then((result)=>{
                res.send(result);
        })
        .catch((err)=>{
                console.log(err);
        })
}

const users=(req,res)=>{
        user.find({})
        .then((result)=>{
                res.send(result);
        })
        .catch((err)=>{
                console.log(err);
        })
}

const review=(req,res)=>{
        feedback.find({})
        .then((result)=>{
                res.send(result);
        })
        .catch((err)=>{
                console.log(err);
        })
}

module.exports={
        quo,sendQuot,paid,orders,updateOrder,users,review
}