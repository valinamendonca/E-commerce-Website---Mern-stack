import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import LoggedinNavbar from '../Components/LoggedinNavbar'
import Footer from '../Components/Footer'
import axios from 'axios'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {saveAs} from 'file-saver'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: 24,
  p: 4,
};


function Quotations() {
  const navigate=useNavigate();
  const routeChange = (path) =>{
          navigate(path);
  }

  const [data,setData]=useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [order,setOrder]=useState(null);

  const openModal = (id) => {
    const orderData=data.find((ord) => ord._id === id)
    if(orderData.totalAmount==0){
      alert("Quotation not yet generated!")
    }else{
      setOrder(orderData);
      setModalOpen(true);  
    }
  };

  const closeModal = () => {
      setModalOpen(false);
      setOrder(null);
  };

  const calTotalQuantity=()=>{
    let totalQuantity = 0;
    order && order.items.forEach((item) => {
      if((typeof(item.q))=="number"){
        totalQuantity += item.q;
      }
    });
    return totalQuantity;
  }

  const generatePDF = async () => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/pdf`,order)
    .then(()=> axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPdf`,{responseType: 'arraybuffer'}))
    .then((res)=>{
      console.log("posted");
      const pdfBlob=new Blob([res.data],{type:'application/pdf'})
      saveAs(pdfBlob, 'quotation.pdf');
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const proceedPayment=()=>{
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/paid`,order)
    .then((req,res)=>{
            if(req.data=="Saved"){
              routeChange("/trackyourorder")
            }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const toDate=(dateTimeString)=>{
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString(); // Get the formatted date
    return date;
  }

  const toTime=(dateTimeString)=>{
    const dateTime = new Date(dateTimeString);
    const time = dateTime.toLocaleTimeString();
    return time;
  }

  const fetchData=async(req,res)=>{
    const id=localStorage.getItem("id");
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/allOrders?id=`+id)
    .then((req,res)=>{
            setData(req.data)
    });
  }

  useEffect(()=>{
    if(localStorage.getItem("authenticated")==null){
      routeChange("/SignIn")
    }
    fetchData();
  },[])

  return (
    <div>
        <Header/><LoggedinNavbar/>
        {data<0?
        <><h2>No quotations requested yet!</h2></>
        :<>
          <table>
            <thead><tr><th className='data'>Id</th><th className='data'>Description</th><th className='data'>Requested On</th><th className='data'>Actions</th></tr></thead>
            <tbody>
            {data && data.map((ele)=>(
              <tr key={ele._id}><td className='data'>{ele._id}</td>
              <td className='data'>
                {ele.items.map((item) => (
                  <div key={item._id}>
                    <p>Type: {item.type}, Diameter: {item.diameter}, Length: {item.length},</p>
                    <p>Total Length: {item.total}, Quantity: {item.q}</p>
                    <hr/>
                  </div>
                ))}
              </td>
              {}
              <td className='data'>{toDate(ele.createdAt)}<br/>{toTime(ele.createdAt)}</td>
              <td className='data'><button onClick={()=>openModal(ele._id)} type='button'>View Quotation</button></td>
              </tr>
            ))}
            </tbody>
          </table>
        </>
      }
        <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography style={{textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2">
            Quotation
          </Typography>
            <br/>
                <table className='data' >
                <thead style={{backgroundColor:"lightseagreen",padding:"20px"}}><tr><th>Id</th><th colSpan={4}>Description</th><th>Quantity</th><th>Price</th><th>Total Price</th></tr></thead>
                <tbody>
                  <tr><td style={{border:"none"}}></td><td>Type</td><td>Diameter</td><td>Length</td><td>Total Length</td></tr>
                  {console.log(order)}
                  {order && order.items && order.items?.map((ele,i)=>
                  (
                    <tr key={ele._id}><td style={{maxWidth:"200px"}}>{i+1}</td><td>{ele.type}</td><td>{ele.diameter}</td><td>{ele.length}</td><td>{ele.total}</td>
                    <td>{ele.q}</td><td style={{width:"10px"}}>{ele.price}</td><td>{ele.totalPrice}</td>
                    </tr>
                  ))}
                  <tr><td colSpan={5}><b>Total Quantity:</b></td><td>{calTotalQuantity()}</td><td><b>Total: </b></td><td>{order?.totalAmount||0}</td></tr>
                  <tr><td colSpan={7} ><b>Total Amount: </b><br/><span style={{color:"red"}}>*After inclusion of 18% GST*</span></td><td><b>{order?.grandTotal}</b></td></tr>
                </tbody>
               </table>
               <button onClick={proceedPayment} style={{textAlign:"center",marginLeft:"45%",backgroundColor:"lightblue",padding:"10px",fontSize:"16px",borderRadius:"5px"}}>Proceed to Payment</button><br/>
               <button type='button' onClick={generatePDF}>Download PDF</button>
        </Box>
      </Modal>
    </div>
  )
}

export default Quotations