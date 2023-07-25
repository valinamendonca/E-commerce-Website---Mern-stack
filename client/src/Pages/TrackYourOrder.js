import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import LoggedinNavbar from '../Components/LoggedinNavbar'
import Footer from '../Components/Footer'
import axios from 'axios'
import { saveAs } from 'file-saver'

function TrackYourOrder() {
  const navigate=useNavigate();
  const routeChange = (path) =>{
          navigate(path);
  }

  const [data,setData]=useState([]);

  const generateBill=(ele)=>{
    return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/pdf`, ele, { responseType: 'arraybuffer' })
    .then((res) => {
      //console.log('posted');
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

      // Save the PDF file using the FileSaver.js library
      saveAs(pdfBlob, 'quotation.pdf');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  const todatetime=(isoDateString)=>{
    if(isoDateString){
      const date = new Date(isoDateString);
      const readableDate = date.toLocaleString();
      return readableDate;
    }
  }
  const fetchData=async(req,res)=>{
    const id=localStorage.getItem("id");
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/allOrders?id=`+id)
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
    if(localStorage.getItem("authenticated")==null){
      routeChange("/SignIn")
    }
fetchData();
  },[])
  return (
    <div>
      <Header/><LoggedinNavbar/>
      {data.length==0?
        <><h2>No orders yet!</h2></>
        :<>
          <table>
            <thead><tr><th className='data'>Id</th><th className='data'>Description</th><th className='data'>Ordered On</th><th className='data'>Delivery Date</th><th className='data'>Status</th><th className='data'>Actions</th></tr></thead>
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
              {console.log(ele.OrderDate)}
              <td className='data'>{todatetime(ele.OrderDate)}</td>
              <td className='data'>{todatetime(ele.deliveryDate)}</td><td className='data'>{ele.status}</td>
              <td className='data'><button onClick={()=>generateBill(ele)} type='button'>Generate Invoice</button></td>
              </tr>
            ))}
            </tbody>
          </table>
        </>
      }
      
      <Footer/>
    </div>
  )
}

export default TrackYourOrder