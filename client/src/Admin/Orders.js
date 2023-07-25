import React, { useEffect,useState } from 'react'
import Header from '../Components/Header'
import AdminHeader from '../AdminComponents/AdminHeader'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import axios from 'axios'
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


function Orders() {
  const [data,setData]=useState([])
  const [modalOpen,setModalOpen]=useState(false);
  const [order,setOrder]=useState({});

  const openModal = (id) => {
          const orderData=data.find((ord) => ord._id === id)
          setOrder(orderData);
          setModalOpen(true);
  };
      
  const closeModal = () => {
          setModalOpen(false);
          setOrder(null);
  };

  const submitHandler=()=>{
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateOrderStat`,order)
    .then((req,res)=>{

    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    if(name=="deliveryDate"){
      setOrder((prevOrder) => ({
        ...prevOrder,
        [name]: value,
      }));
    }else{
      setOrder((prevOrder) => ({
        ...prevOrder,
        [name]: value,
      }));
    }
  }

  const todatetime=(isoDateString)=>{
    if(isoDateString){
      const date = new Date(isoDateString);
      const readableDate = date.toLocaleString();
      return readableDate;
    }
  }

  const fetchData=async(req,res)=>{
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders`)
                .then((req,res)=>{
                  let paidElements = [];
                  // Loop over req.data array
                  req.data.forEach((element) => {
                    // Check if the paid property is true
                    if (element.paid === true) {
                      // If true, store the element in the paidElements array
                      paidElements.push(element);
                    }
                  });
                  setData(paidElements);
                });
  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div>
      <Header/><AdminHeader/>
      <div className='admin-container'>
        <AdminNavbar/>
        <div className='main'>
          {data.length==0?<><h2>No orders placed yet!</h2></>
          :<>
          <h2>All Orders:</h2>
            <table>
            <thead><tr><th className='data'>Id</th><th className='data'>Description</th><th className='data'>Ordered On</th><th className='data'>Delivery Date</th><th className='data'>Status</th><th className='data'>Actions</th></tr></thead>
            <tbody>
            {data && data.map((ele,i)=>(
              <tr key={ele._id}><td className='data'>{i+1}</td>
              <td className='data'>
                {ele.items.map((item) => (
                  <div key={item._id}>
                    <p>Type: {item.type}, Diameter: {item.diameter}, Length: {item.length},</p>
                    <p>Total Length: {item.total}, Quantity: {item.q}</p>
                    <hr/>
                  </div>
                ))}
              </td>
              <td className='data'>{todatetime(ele.OrderDate)}</td>
              <td className='data'>{todatetime(ele.deliveryDate)}</td><td className='data'>{ele.status}</td>
              <td className='data'><button onClick={()=>openModal(ele._id)} type='button'>Edit Order Details</button></td>
              </tr>
            ))}
            </tbody>
          </table>
          </>}
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
            Order Details
          </Typography>
            <br/>
            <form onSubmit={submitHandler}>
                <table className='data' >
                <thead style={{backgroundColor:"lightseagreen",padding:"20px"}}><tr><th>Id</th><th>Ordered On</th><th>Delivery Date</th><th>Status</th></tr></thead>
                <tbody>
                  {order &&
                    <tr><td>{order._id}</td><td>{todatetime(order.OrderDate)}</td><td><input onChange={(e)=>handleChange(e)} type='datetime-local' name='deliveryDate' defaultValue={order.deliveryDate}/></td><td><select onChange={(e)=>handleChange(e)} name='status' defaultValue={order.status}><option value="Pending">Pending</option><option value="Received On Shop Floor">Received On Shop Floor</option><option value="Production Process">Production Process</option><option value="Under Inspection">Under Inspection</option><option value="Delivered">Delivered</option></select></td></tr>
                  } 
               </tbody>
               </table>
               <br/>
               <button style={{textAlign:"center",marginLeft:"50%",backgroundColor:"lightblue",padding:"10px",fontSize:"16px",borderRadius:"5px"}}>Save</button>
            </form>
        </Box>
      </Modal>
    </div>
  )
}

export default Orders