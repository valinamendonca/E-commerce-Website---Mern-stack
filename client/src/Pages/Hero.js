import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import '../css/try.css'
import roll from '../assets/img/roll.png'
import copper from '../assets/img/copper.png'
import hard from '../assets/img/hard.png'
import LogoutNavbar from '../Components/LogoutNavbar'
import LoggedinNavbar from '../Components/LoggedinNavbar'


function Hero() {
	const navigate=useNavigate();
        const routeChange = (path) =>{  
                navigate(path);
        }
	const auth=localStorage.getItem("authenticated")
	if(localStorage.getItem("authenticated") && localStorage.getItem("id")=="admin"){
		routeChange("/adminDashboard")
	}
  return (
    <div>
        <Header/>
	{auth?(<LoggedinNavbar/>):(<LogoutNavbar/>)}
	<div className="box-3">
		<p style={{textAlign: 'left'}}>Mfrs. & Suppliers of:<br/><strong>Quality Printing Rollers</strong></p>
		<table>
			<tbody align="center">
				<tr>
					<td><a href={roll}>
							<img src={roll} width="300px" alt=""/>
						</a>
					</td>
					<td><a href={copper}>
							<img src={copper} width="300px" alt=""/></a>
					</td>
					<td><a href={hard}>
							<img src={hard} width="300px" alt=""/></a>
					</td>
				</tr>
				<tr>
					
						<td>
							<strong>Rubber Rollers</strong>
						</td>
						<td>
							<b>Copper Rollers</b>
						</td>
						<td>
							<b>Hard Chrome Rollers</b>
						</td>
					
				</tr>
			</tbody>
		</table>

		<br/>
	</div>
        <Footer/>
    </div>
  )
}

export default Hero