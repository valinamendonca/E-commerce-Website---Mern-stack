const model1=require("../models/feeback")
const model2=require("../models/order");
const express=require("express");
const app = express();
const pdf=require("html-pdf")
const pdfTemplate=require("../pdfTemplate/QuotationPdf")
const path=require("path")


// middleware
app.use(express.urlencoded({extended:true}));

//add feedback
const review=(req,res)=>{
    const data=new model1(req.body)
    data.save()
    .then(()=>{
        res.send("Saved");
    })
    .catch((err)=>{
        console.log("error",err);
    })
}

//save 
const placeorder=(req,res)=>{
  const itemsData = req.body.slice(0, -1); // Extract the items data from the array
  const reqData = req.body[req.body.length - 1]; // Extract the request data from the last object
  const id = req.body.find((data) => data.id)?.id;
  const data = new model2({
    id: id,
    items: itemsData,
    req: reqData.req,
  });
    data.save()
    .then(()=>{
        console.log("data saved from control");
        res.send("Saved")
    })
    .catch(()=>{
        console.log("data error from control");
    })
}

//find order
const orders=(req,res)=>{
    const specificId = req.query.id; // Assuming the specific id is passed as a URL parameter
    console.log(specificId);
    model2.find({ id: specificId })
    .then((data) => {
      res.status(200).json(data); // Example: send the data as a response
    })
    .catch((error) => {
      console.error(error);
      // Handle the error
      res.status(500).json({ error: "An error occurred while fetching the data." });
    });
}

const pdfDoc = (req, res) => {
    //console.log(req.body); // Log the request body (assuming it contains necessary data for the PDF generation)
  
    pdf.create(pdfTemplate(req.body), {}).toBuffer((err, buffer) => {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred');
      } else {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quotation.pdf');
        res.send(buffer);
      }
    });
  };
  
  
  const send_pdf = (req, res) => {
    pdfDoc(req, res);
  };
  
  
/*
const pdfDoc=(req,res)=>{
    //console.log(req.body);
    const filePath = path.join(__dirname, 'quotation.pdf');
    pdf.create(pdfTemplate(req.body),{}).toFile(filePath,(err)=>{
        if(err){
            console.log(err);
            res.send(Promise.reject());
        }
        console.log("hey");
        res.send(Promise.resolve());
    })
}

const send_pdf=(req,res)=>{
    res.sendFile(`${__dirname}/quotation.pdf`)
}
*/

//export
module.exports={
     placeorder,orders,pdfDoc,review,send_pdf
}
