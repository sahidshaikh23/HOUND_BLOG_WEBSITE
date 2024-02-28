import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Redux/Auth/auth.actions';
function TestUser() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate()
  // const [user, setUser]= useState()
  const dispatch  = useDispatch()
  const {user} =  useSelector(state=>state.auth)
    // const getUser = async()=>{
    //     const res = await axios.get("http://localhost:8000/api/v1/user/current-user",{withCredentials: true}) 
        
    //     if(res.data.valid){
    //       setUser(res?.data?.user?.username) 
    //     }else{
    //       navigate("/login")
    //     }      
    //   }
      useEffect(()=>{
       dispatch(getUser());
      },[dispatch])

      const logoutHandler =async()=>{
          await axios.post("http://localhost:8000/api/v1/user/logout",{withCredentials: true})
          navigate("/login")
      }
  return (
    <>
    <div>hello: {user?.email}</div>
    <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default TestUser