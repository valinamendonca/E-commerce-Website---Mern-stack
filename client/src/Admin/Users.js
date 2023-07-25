import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Header from '../Components/Header'
import AdminHeader from '../AdminComponents/AdminHeader'
import AdminNavbar from '../AdminComponents/AdminNavbar'

function Users() {
  const [user,setUser]=useState([])

  const fetchData=()=>{
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`)
    .then((req,res)=>{
      //console.log(req.data);
      setUser(req.data);
      console.log(user);
    })
    .catch((err)=>{
      console.log(err);
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
          {user.length==0?<><h2>No users registered!</h2></>
          :<>
            <table className='user'>
              <thead><tr className='data' style={{backgroundColor:"lightseagreen"}}><th>Id</th><th>Company Name</th><th>Contact Person Name</th><th>Contact Person Designation</th><th>Contact No</th><th>Email</th><th>Address</th></tr></thead>
              <tbody>
                {user.map(ele=>(
                  <tr key={ele._id}><td>{ele._id}</td><td>{ele.cname}</td><td>{ele.cperson}</td><td>{ele.cdesignation}</td><td>{ele.cno}</td><td>{ele.email}</td><td>{ele.address}</td></tr>
                ))}
              </tbody>
            </table>
          </>}
        </div>
      </div>
    </div>
  )
}

export default Users