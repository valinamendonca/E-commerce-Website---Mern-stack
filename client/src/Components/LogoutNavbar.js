import React from 'react'
import '../css/try.css'
import { Link,useNavigate } from 'react-router-dom'

function Navbar() {
	const navigate=useNavigate();
        const routeChange = (path) =>{
                navigate(path);
        }

	const login=()=>{
                routeChange("/SignIn");
	}
  return (
    <div>
	<ul className="all">
		<li className="all most"><Link to="/about">About</Link></li>
        	<li className="all most"><Link to="/">Home</Link></li>
		<li className="all most"><Link to="/placeorder">Place order</Link></li>
		<li className='all most'><Link to='/quotations'>Quotations</Link></li>
		<li className="all most"><Link to="/trackyourorder">Track your order</Link></li>
		<li className="all most"><Link to="/more">More info</Link></li>
		<button type='button' id='logout' onClick={login}>Log In</button>
		{/*<li style={{textAlign:"right"}}><Link class="all" style={{textDecoration:"none",padding: "15px"}} to='/SignIn'>Sign In</Link></li>*/}
	</ul>
	{/*
	<div class="box-2">
		<p><address>******,<br/>******,<br/>Mumbai - ****.<br/>Mobile: ******<br/><a href="mailto:valerian@live.in">Send Email</a></address></p>
	</div>
  */}
	
    </div>
  )
}

export default Navbar	