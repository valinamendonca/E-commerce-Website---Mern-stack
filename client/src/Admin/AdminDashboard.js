import React from 'react'
import AdminHeader from '../AdminComponents/AdminHeader'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import '../css/admin.css'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>
      <Header/><AdminHeader/>
      <div className='admin-container'>
      <AdminNavbar/>
      <div className="main" style={{backgroundColor:"white"}}>
        <div className='status'>
          <Link to="/users"><div className='totalEmp' ><i className="fas fa-users stat-icon"></i><span>Total Customers:</span><br/> </div></Link>
          <div className='totalProj' ><i className="fas fa-tasks stat-icon"></i><br/>Total Projects:<br/> </div>
          <div className='complete' ><i className="fas fa-check-circle stat-icon"></i><br/>Completed Projects:<br/> </div>
          <div className='ongoing' ><i className="fas fa-spinner stat-icon"></i><br/>Ongoing Projects: <br/> </div>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default AdminDashboard