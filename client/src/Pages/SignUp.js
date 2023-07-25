import React from 'react'
import Header from '../Components/Header'
import LogoutNavbar from '../Components/LogoutNavbar'
import { Link, useNavigate } from 'react-router-dom'
import {Alert} from 'react-alert';
import axios from 'axios';
import Footer from '../Components/Footer';

function SignUp() {
        const navigate=useNavigate();
        const routeChange = (path) =>{ 
                navigate(path);
        }
        const submitHandler=(e)=>{
                e.preventDefault();
                if(validate(e)){
                        //console.log("yes");
                        const cname=e.target.cname.value;
                        const cperson=e.target.cperson.value;
                        const cdesignation=e.target.cdesignation.value;
                        const cno=e.target.cno.value;
                        const address=e.target.address.value;
                        const email=e.target.email.value;
                        const pass=e.target.pass.value;
                        const confirm=e.target.confirm.value;
                        const data={cname,cperson,cdesignation,cno,address,email,pass,confirm};
                        if(data){
                                axios.post(`${process.env.REACT_APP_BACKEND_URL}/reg`,data)
                                .then((req,res)=>{
                                console.log(req);
                                if(req.data==="Email already exists")
                                        alert("Email Id Already Exists!")
                                else{
                                        alert("Registration Successful!\nYou may Login!");
                                        routeChange('/SignIn');
                                }
                                })
                                .catch(error=>{
                                        console.log(error);
                                })
                        }
                }

        }
        const validate=(e)=>{
                if(e.target.pass.value!=e.target.confirm.value){
                        console.log(e.target.pass.value);
                        console.log(e.target.confirm.value);
                        alert("Passwords do not match!");
                }
                else{
                        return true;
                }
        }
  return (
    <div>
        <Header/><LogoutNavbar/>
        <div className='form'>
                <form method='POST' onSubmit={submitHandler}>  <h2>Sign Up</h2><br></br>
                        <table align='center'><tbody>
                        <tr><td>COMPANY NAME:</td><td><input name='cname' required/></td></tr>
                        <tr><td>CONTACT PERSON NAME:</td><td><input name='cperson' required/></td></tr>
                        <tr><td>CONTACT PERSON DESIGNATION:</td><td><input name='cdesignation' required/></td></tr>
                        <tr><td>CONTACT NUMBER:</td><td><input pattern='[0-9]{10}' name='cno' required/></td></tr>
                        <tr><td>DELIVERY ADDRESS:</td><td><textarea name='address' required autoComplete="on"/></td></tr>
                        <tr>
                        <td><label>EMAIL ID: </label></td><td><input name="email" required autoComplete="on"/></td>
                        </tr>
                        <tr>
                        <td><label>PASSWORD: </label></td><td><input name="pass" type="password" required/></td>
                        </tr>
                        <tr><td><label>CONFIRM PASSWORD: </label></td><td><input name="confirm" type="password" required/></td></tr>
                        </tbody></table><br></br>
                        <button className="login-button" >Register</button><br></br><br></br>
                        <span style={{textAlign:"right"}}>Already Have an Account? <Link to="/SignIn"><u>Sign In</u></Link></span>
                </form>   
        </div>
        <Footer/>
    </div>
  )
}

export default SignUp