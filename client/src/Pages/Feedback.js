import React,{useRef} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import LogoutNavbar from '../Components/LogoutNavbar'
import LoggedinNavbar from '../Components/LoggedinNavbar'
import axios from 'axios'


function Feedback() {
	const formRef = useRef(null);
	const auth=localStorage.getItem("authenticated")
	const submitHandler=(e)=>{
		e.preventDefault();
		var email="Anonymous";
		const review=e.target.content.value;
		if(localStorage.getItem("authenticated")){
			email=localStorage.getItem("id");
		}
		const data={email,review}
		return axios.post(`${process.env.REACT_APP_BACKEND_URL}/review`,data)
		.then((req,res)=>{
			if(req.data=="Saved"){
				alert("Feedback Sent!")
				formRef.current.reset();
			}
		})
		.catch((err)=>{
			console.log(err);
		})
	}
  return (
    <div>
        <Header/>{auth?(<LoggedinNavbar/>):(<LogoutNavbar/>)}
        <br/>
	<div class="box-3">
		<p>Your Feedback is valuable for our improvement. Thank you for your time.</p>
		<br/>
		<form ref={formRef} onSubmit={submitHandler} method="POST" autocomplete="no">
			<div>
				<label>Feedback:</label>
				<br/>
				<textarea name="content"></textarea><br/><br/>
				<button>Submit</button>
			</div>
		</form>
	</div>
	<Footer/>
    </div>
  )
}

export default Feedback