import React,{useState} from "react";
import { API_URL } from "../../utilities/apiPath";
const Login = ({ showWelcomeHandler, setShowLogOut, setShowFirmTitle }) => {
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const loginHandler = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const data=await response.json();
      if(response.ok){
        setEmail("");
        setPassword("");
        alert("vendor login successful");
        localStorage.setItem('loginToken',data.token);

        const vendorId = data.vendorId;
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        const vendorData = await vendorResponse.json();
        if (vendorResponse.ok) {
          const vendorFirmId = vendorData.vendorFirmId;
          const vendorFirmName = vendorData.vendor.firm[0].firmName;

          localStorage.setItem('firmId', vendorFirmId);
          localStorage.setItem('vendorFirmName', vendorFirmName);
        }
        window.location.reload();
        showWelcomeHandler();
        
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label >Email:</label>
        <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" />
        <br />
        <label >Password:</label>
        <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password" />
        <br />
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div><br />
      </form>
    </div>
  );
};

export default Login;
