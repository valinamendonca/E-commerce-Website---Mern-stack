import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import LogoutNavbar from '../Components/LogoutNavbar'
import axios from 'axios';
import Footer from '../Components/Footer';


function SignIn() {
        const navigate=useNavigate();
        const routeChange = (path) =>{  
                navigate(path);
        }
        const submitHandler=(event)=>{
                event.preventDefault();
                const email=event.target.email.value;
                const pass=event.target.pass.value;
                const user_data={email,pass};
                if(user_data){
                        
                        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,user_data)
                        .then((req,res)=>{
                                if(req.data==="Logged in successfully!!!"){
                                        localStorage.setItem("id",email)
                                        localStorage.setItem("authenticated",true);
                                        console.log(localStorage.getItem("authenticated"));
                                        routeChange("/");
                                        //window.location.reload(false)
                                }
                                else if(req.data=="Admin"){
                                        localStorage.setItem("id","admin")
                                        localStorage.setItem("authenticated",true);
                                        routeChange("/adminDashboard");
                                        window.location.reload(true);
                                }
                                else if(req.data==="Wrong credentials!")
                                        alert("Wrong credentials!")
                                else{
                                        alert("Username does not exist!");
                                }
                        })
                        .catch(error=>{
                                console.log(error);
                        })
                }
        }
  return (
    <div>
        <Header/><LogoutNavbar/>
        <div className='form'>
                <form method='POST' onSubmit={submitHandler}>  <h2>Sign In</h2><br></br>
                        <table align='center'><tbody>
                        <tr>
                        <td><label>EMAIL: </label></td><td><input name="email" required/></td>
                        </tr>
                        <tr>
                        <td><label>PASSWORD: </label></td><td><input name="pass" type="password" required/></td>
                        </tr>
                        <tr><td>
                        <span className='left'><input type="checkbox"/> Remember Me</span></td>
                        <td><Link className='right' to="/reset">Forgot Password?</Link></td><br></br><br></br>
                        </tr>
                        </tbody></table><br></br>
                        <button className="login-button" >LOGIN</button><br></br><br></br>
                        <span style={{textAlign:"right"}}>New User? <Link to="/SignUp"><u>Sign up</u></Link></span>
                </form>   
        </div>
        <Footer/>
    </div>
  )
}

export default SignIn;