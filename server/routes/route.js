const express=require("express");
const router=express.Router();
const contr=require("../controller/control");
const auth=require("../controller/authen");
const admin=require("../controller/admin")


//authentication
router.post("/reg", auth.reg)
router.post("/login", auth.login)

//customer
router.post("/placeorder",contr.placeorder)
router.get("/allOrders",contr.orders)
router.post("/review",contr.review)
router.post("/pdf",contr.pdfDoc)
//router.get("/getPdf",contr.send_pdf)

//admin
router.get("/quotations",admin.quo)
router.post("/sendQuot",admin.sendQuot)
router.post("/paid",admin.paid)
router.get('/orders',admin.orders)
router.put('/updateOrderStat',admin.updateOrder)
router.get("/users",admin.users)
router.get("/review",admin.review)

/*
router.get("/",(req,res)=>{
    res.render("index")
})
router.get("/about",(req,res)=>{
    res.render("about")
})
router.get("/placeorder",(req,res)=>{
    res.render("placeorder")
})
router.get("/trackyourorder",(req,res)=>{
    res.render("trackyourorder")
})
router.get("/more",(req,res)=>{
    res.render("more")
})

router.post("/feedback",(req,res)=>{
    contr.addfdbk(req.body);
    console.log(req.body);
    res.send("Entered data is saved")
})

router.post("/order",(req,res)=>{
    console.log(req.body);
    contr.placeorder(req.body);
    res.send("Entered data is saved");
})
*/

module.exports=router
