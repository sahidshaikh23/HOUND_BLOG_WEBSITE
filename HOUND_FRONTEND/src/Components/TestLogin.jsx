import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
function TestLogin() {
    const [loginForm, setLoginForm] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setLoginForm({
            ...loginForm,
            [name]:value,
        })
    }

    const handleLogin = async(e)=>{
        e.preventDefault();

        try {
            //const res = await axios.post('/api/v1/user/login',loginForm,{withCredentials: true});
            //console.log(res.success)
            //  alert("successfully logged in")
            //  navigate("/user")

             const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginForm),
              });

              const data = await res.json();
              if(data.success===true){
                navigate("/");
              }
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <div>
        <form onSubmit={handleLogin}>
            <div>
                <label >Email ID: </label>
                <input type="email" name='email' value={loginForm.email} onChange={handleChange} required/>
            </div>
            <div>
                <label >Password: </label>
                <input type="password" name='password' value={loginForm.password} onChange={handleChange} required/>
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>
        </form>
    </div>
  )
}

export default TestLogin