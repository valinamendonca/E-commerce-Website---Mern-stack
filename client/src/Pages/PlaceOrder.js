import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import LoggedinNavbar from '../Components/LoggedinNavbar'
import axios from 'axios'

function PlaceOrder() {
  const navigate=useNavigate();
  const routeChange = (path) =>{  
          navigate(path);
  }
  
  let inputData = [];

  const submitHandler=(e)=>{
    e.preventDefault();
    var i;
    for(i=1;i<=counter;i++){
      console.log(i);
      const type=e.target['rubber_type_' + i].value;
      const diameter=e.target['rubber_diameter_' + i].value;
      const length=e.target['rubber_length_' + i].value
      const total=e.target['rubber_total_' + i].value;
      const q=e.target['rubber_q_' + i].value
      const data={type,diameter,length,total,q};
      inputData.push(data);
    }
    
    for(i=1;i<=counter1;i++){
      const type=e.target['copper_type_' + i].value;
      const diameter=e.target['copper_diameter_' + i].value;
      const length=e.target['copper_length_' + i].value
      const total=e.target['copper_total_' + i].value;
      const q=e.target['copper_q_' + i].value
      const data={type,diameter,length,total,q};
      inputData.push(data);
    }
    const reqValue=e.target.req.value;
    const requestData = { req: reqValue };
    inputData.push(requestData)
    const id={id: localStorage.getItem("id")}
    inputData.push(id);

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/placeorder`,inputData)
    .then((req,res)=>{
      if(req.data=="Saved"){
        routeChange("/quotations");
      }
    })
    .catch(error=>{
      console.log(error);
    })
    /*
                const rubber_type=e.target.rubber_type.value;
                const rubber_diameter=e.target.rubber_diameter.value;
                const rubber_length=e.target.rubber_length.value
                const rubber_total=e.target.rubber_total.value;
                const rubber_q=e.target.rubber_q.value
                const data={rubber_type,rubber_diameter,rubber_length,rubber_total,rubber_q};
                inputData.push(data);
                //const user_data={email,pass};
                if(data){
                        //console.log(data);
                  /*
                        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,user_data)
                        .then((req,res)=>{
                                if(req.data==="Logged in successfully!!!"){
                                        localStorage.setItem("id",email)
                                        localStorage.setItem("authenticated",true);
                                        routeChange("/");
                                        //window.location.reload(false)
                                }
                                else if(req.data=="Admin"){
                                        localStorage.setItem("id","admin")
                                        localStorage.setItem("authenticated",true);
                                        routeChange("/adminDashboard");
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
                        
              
                */
  //}
  /*
  const inputs = document.getElementsByTagName("input");
    const selects = document.getElementsByTagName("select");

    // Loop through the input fields
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const name = input.name;
      const value = input.value;
      inputData.push({ name, value });
    }

    // Loop through the select fields
    for (let i = 0; i < selects.length; i++) {
      const select = selects[i];
      const name = select.name;
      const value = select.value;
      inputData.push({ name, value });
    }

    console.log(inputData);
  console.log(inputFields);
  */
}



const [inputFields, setInputFields] = useState([]);

  const handleAddFields = () => {
    setInputFields([...inputFields, { copperType: '', diameter: '', length: '', totalLength: '', quantity: '' }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the inputFields data to your MongoDB or perform any other necessary actions
    
  };


  let counter1=1;
  function run() {
counter1++;
    const div = document.createElement("div");
const uniqueID = counter1;

div.innerHTML = `
<span style={{paddingRight: "40px"}}>
<label>Coating:</label>
<select name="copper_type_${uniqueID}">
  <option value="copper">Copper</option>
  <option value="polyurethane">Polyurethane</option>
</select>
</span>

<span style={{paddingRight: "40px"}}>
<label>Diameter:</label>
<input type="text" name="copper_diameter_${uniqueID}" placeholder="in mm" size="15"/>
</span>
<br/>
<span>
<label>Length:</label>

<input type="text" name="copper_length_${uniqueID}" placeholder="in mm" size="15"/>
</span>
<br></br>
<span style={{paddingRight: "50px"}}>
<label>Total Length:</label>

<input type="text" name="copper_total_${uniqueID}" placeholder="in mm"/>
</span>

<span>
<label>Quantity:</label>

<input type="text" name="copper_q_${uniqueID}"/>
</span>
<hr/>
`;

document.getElementById("add").appendChild(div);
    }

    let counter=1;
    function run2() {
    counter++;
      /*
    var div = document.getElementById("meh1").innerHTML; //create new div
    //div.addEventListener("click", run); //bind click to new div
    document.getElementById("add1").innerHTML+=div; //append the new div to clicked div
    //this.removeEventListener("click", run); //remove the original click event
*/
    
const div = document.createElement("div");
const uniqueID = counter;

div.innerHTML = `
  <span style="padding-right: 50px;">
    <label>Coating:</label>
    <select name="rubber_type_${uniqueID}">
      <option value="nitrile">Nitrile</option>
      <option value="natural">Natural</option>
      <option value="neoprene">Neoprene</option>
      <option value="silicone">Silicone</option>
    </select>
  </span>
  <span style="padding-right: 50px;">
    <label>Diameter:</label>
    <input type="text" name="rubber_diameter_${uniqueID}" placeholder="in mm" size="15"/>
  </span>
  <br/>
  <span>
    <label>Length:</label>
    <input type="text" name="rubber_length_${uniqueID}" placeholder="in mm" size="15"/>
  </span> <br></br>
  <span style="padding-right: 50px;">
    <label>Total Length:</label>
    <input type="text" name="rubber_total_${uniqueID}" placeholder="in mm"/>
  </span>
  <span>
    <label>Quantity:</label>
    <input type="text" name="rubber_q_${uniqueID}"/>
  </span>
  <br></br>
  <hr/>
`;

document.getElementById("add1").appendChild(div);
    }
  return (
    <div>
      <Header/><LoggedinNavbar/>
      <div className="box-3">

        <p>Kindly fill in your details</p>

        <form  onSubmit={submitHandler} method="POST" autoComplete="no">
          <div>
          <b>Requirements:</b><br/><br/>

          

    {/*  {inputFields.map((inputField, index) => (
        <div key={index}>
          <span style={{ paddingRight: "40px" }}>
            <label>Coating:</label>
            <select
              name="copperType"
              value={inputField.copperType}
              onChange={(event) => handleInputChange(index, event)}
            >
              <option value="copper">Copper</option>
              <option value="polyurethane">Polyurethane</option>
            </select>
          </span>
          <span style={{ paddingRight: "40px" }}>
            <label>Diameter:</label>
            <input
              type="text"
              name="diameter"
              value={inputField.diameter}
              placeholder="in mm"
              size="15"
              onChange={(event) => handleInputChange(index, event)}
            />
          </span>
          <br/>
          <span>
            <label>Length:</label>
            <input
              type="text"
              name="length"
              value={inputField.length}
              placeholder="in mm"
              size="15"
              onChange={(event) => handleInputChange(index, event)}
            />
            </span>

<span>
  <label>Quantity:</label>
  <input
    type="text"
    name="quantity"
    value={inputField.quantity}
    onChange={(event) => handleInputChange(index, event)}
  />
</span>
<hr/>
</div>
))}
<div id="add"></div>
      <button type="button" onClick={handleAddFields} style={{ backgroundColor: "lightblue" }}>
        Add More
      </button>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
    */}
          <div
            style={{textAlign:"left",position: "relative", float: "left", width: "48%", backgroundColor: "lightblue", padding: "10px", borderRadius: "10px", marginRight: "5px"}}>
            <b>For Copper Rollers:</b><br/><br/>
            <div id="meh">
            <span style={{paddingRight: "40px"}}>
              <label>Coating:</label>
              <select name="copper_type_1">
                <option value="copper">Copper</option>
                <option value="polyurethane">Polyurethane</option>
              </select>
            </span>

            <span style={{paddingRight: "40px"}}>
              <label>Diameter:</label>
              <input type="text" name="copper_diameter_1" placeholder="in mm" size="15"/>
            </span>
            <br/>
            <span>
              <label>Length:</label>

              <input type="text" name="copper_length_1" placeholder="in mm" size="15"/>
            </span>
            <br></br>
            <span style={{paddingRight: "50px"}}>
              <label>Total Length:</label>

              <input type="text" name="copper_total_1" placeholder="in mm"/>
            </span>

            <span>
              <label>Quantity:</label>

              <input type="text" name="copper_q_1"/>
            </span>
            <hr/>
            
            </div>
            <div id="add"></div>
            <button type="button" onClick={run} style={{backgroundColor: "lightblue"}}>Add More</button>
          </div>
  


          <div style={{textAlign:"left",float: "right", width: "48%", backgroundColor: "lightblue", padding: "10px", borderRadius: "10px"}}>
            <legend><b>For Rubber Rollers:</b></legend><br/>
            <div id="meh1">
            <span style={{paddingRight: "50px"}}>
              <label>Coating:</label>
              <select name="rubber_type_1">
                <option value="nitrile">Nitrile</option>
                <option value="natural">Natural</option>
                <option value="neoprene">Neoprene</option>
                <option value="silicone">Silicone</option>
              </select>
            </span>
            <span style={{paddingRight: "50px"}}>
              <label>Diameter:</label>
              <input type="text" name="rubber_diameter_1" placeholder="in mm" size="15"/>
            </span>
            <br/>
            <span>
              <label>Length:</label>
              <input type="text" name="rubber_length_1" placeholder="in mm" size="15"/>
            </span> <br></br>
            <span style={{paddingRight: "50px"}}>
              <label>Total Length:</label>
              <input type="text" name="rubber_total_1" placeholder="in mm"/>
            </span>
            <span>
              <label>Quantity:</label>
              <input type="text" name="rubber_q_1"/>
            </span>
            <br></br>
            <hr/>
            </div>
            <div id="add1"></div>
            <button type="button" onClick={run2} style={{backgroundColor: "lightblue"}}>Add More</button>
          </div>
          
          </div>
          <div
            style={{clear:"left",position: "relative", marginLeft:"40%", backgroundColor:"lightblue", padding: "10px", overflow: "hidden", marginTop: "50px", borderRadius: "10px", width: "20%"}}>
            <label><b>Special Request:</b></label>
            <textarea name="req"></textarea>
          </div>

          <p>*It is advisable to communicate with the product incharge for the exact requirements of the product*
          </p>
          <input type='reset'/>
          <button type="submit" style={{backgroundColor: "lightblue"}}>Request for Quotation</button>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default PlaceOrder