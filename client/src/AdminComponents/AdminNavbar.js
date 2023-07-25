import React from 'react'
import {Link} from 'react-router-dom'
import '../css/admin.css'


function Navbar() {
  return (
    <div>
	<div style={{backgroundColor: '#0C134F',color:'white'}} className='navbar'>
	<ul>
		<li style={{listStyleType:"none",fontSize:"16px",borderBottom:"1px solid grey",padding:"10px"}}><Link style={{color:'white',textDecoration:"none"}} to='/adminDashboard'>Dashboard</Link></li>
		<li style={{listStyleType:"none",fontSize:"16px",borderBottom:"1px solid grey",padding:"10px"}}><Link style={{color:'white',textDecoration:"none"}} to='/users'>User Management</Link></li>
    <li style={{listStyleType:"none",fontSize:"16px",borderBottom:"1px solid grey",padding:"10px"}}><Link style={{color:'white',textDecoration:"none"}} to='/viewQuotations'>Quotations</Link></li>
    <li style={{listStyleType:"none",fontSize:"16px",borderBottom:"1px solid grey",padding:"10px"}}><Link style={{color:'white',textDecoration:"none"}} to='/viewOrders'>Orders</Link></li>
		<li style={{listStyleType:"none",fontSize:"16px",borderBottom:"1px solid grey",padding:"10px"}}><Link style={{color:'white',textDecoration:"none"}} to='/feedback'>View Feedback</Link></li>

	</ul>
        </div>
    </div>
  )
}

export default Navbar