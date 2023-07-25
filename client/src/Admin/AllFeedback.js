import React, { useEffect,useState } from 'react'
import Header from '../Components/Header'
import AdminHeader from '../AdminComponents/AdminHeader'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import axios from 'axios'

function AllFeedback() {
  const [data,setData]=useState([]);

  const fetchData=()=>{
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/review`)
    .then((req,res)=>{
      setData(req.data);
    })
    .catch(error=>{
      console.log(error);
    })
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
          {data.length==0?<><h2>No Feedbacks received yet!</h2></>
          :<><h2>Feedbacks:</h2>
            <table className='user'>
              <thead><tr style={{backgroundColor:"lightseagreen"}}><th width={400}>Email</th><th>Reviews</th></tr></thead>
              <tbody>
                {data.map(ele=>(
                  <tr style={{backgroundColor:"lightgrey"}}><td>{ele.email}</td><td>{ele.review}</td></tr>
                ))}
              </tbody>
            </table>
          </>  
          }
        </div>
      </div>
    </div>
  )
}

export default AllFeedback