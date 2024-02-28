import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function TestSignup() {
    const [userForm, setUserForm] = useState({
        username:"",
        email:"",
        password:"",
        profileImage:null,
        coverImage:null,
    })

    const navigate = useNavigate()
    
    const handleChange = (e)=>{
        const {name, value, type} = e.target;

        if(type==="file"){
            setUserForm({
                ...userForm,
                [name]: e.target.files[0]
            }) 
            // console.log(e.target.files[0])
        }else{
            setUserForm({
                ...userForm,
                [name]:value,
            })
        }
        
    }
    const handleSubmit=async(e)=>{
            e.preventDefault();
            
        try {
            const formDataToSend = new FormData();
            // Append data to the form data object
            Object.entries(userForm).forEach(([key, value]) => {
              formDataToSend.append(key, value);
            });

            console.log(formDataToSend)
            // console.log(userForm)
        //    await fetch('http://localhost:8000/api/v1/user/register', {
        //         method: 'POST',
        //         body: formDataToSend,
        //       })
        //         .then(response => response.json())
        //         .then(data => console.log('Response:', data))
        //         .catch(error => console.error('Error:', error));
            await axios.post("/api/v1/user/register",formDataToSend)
            
            navigate("/login")
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label >Username: </label>
                <input type="text" name='username' value={userForm.username} onChange={handleChange} required/>
            </div>
            <div>
                <label >Email ID: </label>
                <input type="email" name='email' value={userForm.email} onChange={handleChange} required/>
            </div>
            <div>
                <label >Password: </label>
                <input type="password" name='password' value={userForm.password} onChange={handleChange} required/>
            </div>
            <div>
          <label>Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
  )
}

export default TestSignup