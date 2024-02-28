import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../Redux/Auth/auth.actions';
import { toast } from 'react-toastify';

export default function PrivateRoute({Component}) {
  
    const { isAuth } = useSelector((state) => state.auth);
    
  useEffect(()=>{
    if(!isAuth) {
      toast.warning("To Explore more, Please Login");
    }
  },[isAuth]);
    
    return isAuth ? <Component /> : <Navigate to='/' />;
  }