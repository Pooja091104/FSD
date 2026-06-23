import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css";


const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState()

    const loginApi = "http://localhost:8080/api/auth/login"; 
    const userDetailsApi="http://localhost:8080/api/auth/user-details"

    const navigate = useNavigate()

    const onLogin = async (e)=>{
        e.preventDefault();
        // Prepare the header
        const config = {
            headers :{
                'Authorization' : "Basic " + window.btoa(username + ":" + password)
            } 
        }

        try{
            const response = await axios.get(loginApi , config) 
            console.log(response.data)
            let token = response.data.token 
            // Save this in localStorage 
            localStorage.setItem("token" , token)
             localStorage.setItem("username", username)

            // Prepare the header 
            const config_details = {
            headers :{
                'Authorization' : "Bearer " + token
                } 
            }
            // Fetch User Details
            const resp = await axios.get(userDetailsApi, config_details)
            console.log(resp.data)
            let role = resp.data.role
            switch(role){
                case 'ADMIN':
                    navigate('/admin')
                    break; 
                case 'EMPLOYEE':
                    navigate('/employee')
                    break; 
                default: 
                    setErrMsg("Invalid credentials")
                    break; 
            }
        }
        catch(err){
            setErrMsg("Invalid credentials")
        }
        
    }
   return (
  <div className="login-page">
    <div className="login-card">
      <h2>Login</h2>

      <form onSubmit={onLogin}>

        {errMsg && (
          <div className="alert-box">
            {errMsg}
          </div>
        )}

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

      </form>
    </div>
  </div>
);
}

export default Login