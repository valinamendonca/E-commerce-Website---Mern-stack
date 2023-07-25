import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../Components/Header'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import AdminHeader from '../AdminComponents/AdminHeader'
import Footer from '../Components/Footer'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
      

function AllQuotations() {
        const navigate=useNavigate();
        const routeChange = (path) =>{
                navigate(path);
        }

        const [modalOpen, setModalOpen] = useState(false);
        const [data,setData]=useState([]);
        const [order,setOrder]=useState(null);

        const openModal = (id) => {
                const orderData=data.find((ord) => ord._id === id)
                setOrder(orderData);
                setModalOpen(true);
        };
            
        const closeModal = () => {
                setModalOpen(false);
                setOrder(null);
        };

        const handlePriceChange = (event,i) => {
          const price = event.target.value;
          // Update the price value in your data or state if needed
          order.items[i].price = price;
          // Calculate the total price for the item
          order.items[i].totalPrice = calculateTotalPrice(order.items[i].q, price);
          order.totalAmount=calTotalAmount()
          order.grandTotal=calGST();
          // Update the state of 'order'
          setOrder({ ...order });
          console.log(order);
        };
      
        const calculateTotalPrice = (quantity, price) => {
          const totalPrice = quantity * price;
          return totalPrice; // Adjust the formatting as needed
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

        const calTotalAmount=()=>{
          let totalPrice=0;
          order && order.items.forEach((item) => {
            if((typeof(item.totalPrice))=="number"){
              totalPrice += item.totalPrice;
            }
          });
          return totalPrice;
        }

        const calGST=()=>{
          const taxRate=0.18;
          const taxAmount=order.totalAmount*taxRate;
          const grandTotal= taxAmount+order.totalAmount;
          return grandTotal.toFixed(2);
        }

        const submitHandler=()=>{
          return axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendQuot`,order)
          .then((req,res)=>{
            if(req.data=="Saved"){
              routeChange("/quotations");
            }
          })
          .catch(error=>{
            console.log(error);
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
          return axios.get(`${process.env.REACT_APP_BACKEND_URL}/quotations`)
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
        <Header/><AdminHeader/>
        <div className='admin-container'>
                <AdminNavbar/>
                <div className='main'>
                {data<0?
        <><h2>No quotations requested yet!</h2></>
        :<><h2>All Quotations:</h2>
          <table>
            <thead><tr><th style={{backgroundColor: "rgb(114,230,255)"}} className='data'>Id</th><th className='data'>Description</th><th className='data'>Requested On</th><th className='data'>Actions</th></tr></thead>
            <tbody>
            {data && data.map((ele,id)=>(
              <tr key={ele._id}><td className='data'>{id+1}</td>
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
              <td className='data'><button onClick={()=>openModal(ele._id)} type='button'>Edit Quotation</button></td>
              </tr>
            ))}
            </tbody>
          </table>
        </>
      }    
      </div>
    </div>
        
        
        <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2">
            Quotation
          </Typography>
            <br/>
            <form onSubmit={submitHandler}>
                <table className='data' >
                <thead style={{backgroundColor:"lightseagreen",padding:"20px"}}><tr><th>Id</th><th colSpan={4}>Description</th><th>Quantity</th><th>Price</th><th>Total Price</th></tr></thead>
                <tbody>
                  <tr><td style={{border:"none"}}></td><td>Type</td><td>Diameter</td><td>Length</td><td>Total Length</td></tr>
                  {order && order.items && order.items?.map((ele,i)=>
                  (
                    <tr key={ele._id}><td style={{maxWidth:"200px"}}>{i+1}</td><td>{ele.type}</td><td>{ele.diameter}</td><td>{ele.length}</td><td>{ele.total}</td>
                    <td>{ele.q}</td><td style={{width:"10px"}}><input style={{textAlign:"right",width:"80px"}} value={ele.price} type='number' onChange={(e)=>handlePriceChange(e,i)} /></td><td>{ele.totalPrice}</td>
                    </tr>
                  ))}
                  <tr><td colSpan={5}><b>Total Quantity:</b></td><td>{calTotalQuantity()}</td><td><b>Total Price:</b></td><td>{order?.totalAmount||0}</td></tr>
                  <tr><td colSpan={7} ><b>Total Amount: </b><br/><span style={{color:"red"}}>*After inclusion of 18% GST*</span></td><td><b>{order?.grandTotal}</b></td></tr>
                </tbody>
               </table>
               <button style={{textAlign:"center",marginLeft:"50%",backgroundColor:"lightblue",padding:"10px",fontSize:"16px",borderRadius:"5px"}}>Send</button>
            </form>
        </Box>
      </Modal>
      {/*
      <Footer/>
                  */}
    </div>
  )
}

export default AllQuotations