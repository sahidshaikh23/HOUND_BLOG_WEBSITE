import axios from "axios"
import { AUTH_GETUSER, AUTH_GET_VISITED_USER, AUTH_LOGIN, AUTH_LOGOUT, AUTH_SIGNUP, AUTH_UPDATE_USER, START_LOADING, STOP_LOADING } from "./auth.types.js"
axios.defaults.withCredentials = true;

export const loginAPI =(formData)=>async(dispatch)=>{
    try {
        dispatch({
            type: START_LOADING
        })
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/login`, formData, {withCredentials: true})

        if(response.status===200){
            dispatch({
                type: AUTH_LOGIN,
                payload: response.data.LoggedInUser
            })
            return {data:response.data.LoggedInUser, error:null}
        }else{

            return { data:null, error:response}
        }
    } catch (error) {
        dispatch({
            type: STOP_LOADING
        })
        // console.log(error.response.data.error)
        return { data: null, error: error.response.data.error };
    } finally{
        dispatch({
            type: STOP_LOADING
        })
    }
}

    export const signUpAPI =(formData)=>async(dispatch)=>{
        try {
            dispatch({
                type: START_LOADING
            })
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/register`, formData);
            if(response.status===201){
                dispatch({
                    type: AUTH_SIGNUP,
                })
                // console.log(response)
                return {data:response, error:null}
            }else{
                // console.log(response)
                return { data:null, error:response}
            }
        } catch (error) {
            dispatch({
                type: STOP_LOADING
            })
            console.log(error.message)
            return { data: null, error: error.response.data.error };
        } finally {
            dispatch({
                type: STOP_LOADING
            })
        }
    }

export const logOutAPI=()=>async(dispatch)=>{
    try {
        // await axios.post("http://localhost:8000/api/v1/user/logout",id,{withCredentials: true})
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/logout`,{withCredentials: true})
        dispatch({
            type: AUTH_LOGOUT,
        })
        // persistor.purge();
    } catch (error) {
        console.log(error.message)
    }
}

export const getUser=()=>async(dispatch)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/current-user`,{withCredentials: true})
        // if(response.data.valid===true) {
        //     return window.location.reload();
        // }else{
        dispatch({
            type: AUTH_GETUSER,
            payload: response.data.user
        })

        // console.log(response.data.user)
        return response.data.user

    } catch (error) {
        console.log(error.message)
    }
}

export const getUserData=(userId)=>async(dispatch)=>{
    try {
        dispatch({
            type: START_LOADING
        })
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/userdata/${userId}`,{withCredentials: true})
        // console.log(response.data)
        if(response.data.valid===true) {
            return window.location.reload();
        }else{
        dispatch({
            type :AUTH_GET_VISITED_USER,
            payload: response.data
        })
    }
        return response.data
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: STOP_LOADING
        })
    } finally{
        dispatch({
            type: STOP_LOADING
        })
    }
}

export const follow =async(userId)=>{
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/userdata/${userId}`,{withCredentials: true})
        // console.log(response.data.userStatus)
        return response.data.userStatus
    } catch (error) {
        console.log(error.message)
    }
}
export const unfollow =async(userId)=>{
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/userdata/${userId}`,{withCredentials: true})
        // console.log(response.data.userStatus)
        return response.data.userStatus
    } catch (error) {
        console.log(error.message)
    }
}

export const currentFollowStatus = async(userId)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/userdata/${userId}/follow-status`,{withCredentials: true})
        return response
    } catch (error) {
        console.log(error.message)
    }
}

export const userFollowerAndFollowing = async(userId)=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/userdata/${userId}/followdata`,{withCredentials: true})
        // console.log(response.data)
        return response
    } catch (error) {
        console.log(error.message)
    }
}


export const updateUserData = (updateData)=>async(dispatch)=>{
    try {
        const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/update-account-details`,updateData,{withCredentials: true})
        // console.log(response.data.user)
        dispatch({
            type: AUTH_UPDATE_USER,
            payload: response.data.user
        })
        return response
    } catch (error) {
        console.log(error.message)
    }
}


export const updateUserImage=async(formData)=>{
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/upload-images`, formData, {withCredentials: true});
        return response
    } catch (error) {
        console.log(error.message)
    }
}


// export const logoutHandler =async()=>{
//     await axios.post("http://localhost:8000/api/v1/user/logout",{withCredentials: true})
//     navigate("/login")
// }