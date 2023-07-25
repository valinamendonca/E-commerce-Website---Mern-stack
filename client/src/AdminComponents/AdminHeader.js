import React from 'react'
import {useNavigate} from 'react-router-dom'

function AdminHeader() {
  const navigate=useNavigate();
        const routeChange = (path) =>{
                navigate(path);
        }
        //log out functionality
        const logout=(event)=>{
                event.preventDefault();
                localStorage.clear();
                routeChange("/");
        }
  return (
    <div style={{backgroundColor:"lightblue",height:"50px"}}>
      <button type='button' id='logout' onClick={logout}>Log Out</button>
    </div>
  )
}

export default AdminHeader