import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import axios from 'axios';

function Login() {
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [password,setPassword]=useState("");
    const [err, setErr] = useState(null);
    const navigate = useNavigate()
    const signIn=async (e)=>
    {
          e.preventDefault();
          try{
          const path="http://localhost:3600/api/manager/login";
          const res=await axios({
          method: 'POST',
          baseURL: path,
          data: {first_name:firstName,last_name:lastName,password:password}})
          console.log(res.data)
          localStorage.setItem("token", JSON.stringify(res.data.accessToken));
          navigate("./register")
        }
          catch(err)
          {
           setErr(err.response.data?.message);
          }      
    }
  return (
    <div id="login-container">
    <label htmlFor='firstName_login' >שם פרטי</label>
    <input id="firstName_login" onBlur={(e)=>{setFirstName(e.target.value)}} type="text" placeholder='first name'></input>
    <br/>
    <label htmlFor='lastName_login'>שם משפחה</label>
    <input id="lastName_login" onBlur={(e)=>{setLastName(e.target.value)}} type="text" placeholder='שם משפחה'></input>
    <br/>
    <label htmlFor='password_login'>סיסמה</label>
    <input id="password_login" onBlur={(e)=>{setPassword(e.target.value)}} type="password" placeholder='סיסמה'></input>
    <br/>
    <button onClick={signIn}>כניסה</button>
    </div>
  )
}

export default Login