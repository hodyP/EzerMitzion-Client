import React from 'react'
import {useState} from "react"
import '../login/style.css';
import axios from 'axios';

const Register = () => {
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [password,setPassword]=useState("");
    const [verifypassword,setVerifyPassword]=useState("");
    const validpassword=()=>{
        if(password==verifypassword)
        return true
        return false
    }
    const signUp=()=>
    {
        if(validpassword())
        {
            const path="http://localhost:3600/api/manager/register";
            axios({
            method: 'POST',
            baseURL: path,
            data: {first_name:firstName,last_name:lastName,password:password}}).catch((err)=>{ console.log(err)})
        }
    }
  return (
    <div id="login-container">
    <label htmlFor='firstName_register' >שם פרטי</label>
    <input id="firstName_register" onBlur={(e)=>{setFirstName(e.target.value)}} type="text" placeholder='first name'></input>
    <br/>
    <label htmlFor='lastName_register'>שם משפחה</label>
    <input id="lastName_register" onBlur={(e)=>{setLastName(e.target.value)}} type="text" placeholder='שם משפחה'></input>
    <br/>
    <label htmlFor='password_register'>סיסמה</label>
    <input id="password_register" onBlur={(e)=>{setPassword(e.target.value)}} type="password" placeholder='סיסמה'></input>
    <br/>
    <br/>
    <label htmlFor='verifypassword_register'>אימות סיסמא</label>
    <input id="verifypassword_register" onBlur={(e)=>{setVerifyPassword(e.target.value)}} type="password" placeholder='סיסמה'></input>
    <br/>
    <button onClick={signUp}>הרשמה</button>
    </div>
  )
}

export default Register