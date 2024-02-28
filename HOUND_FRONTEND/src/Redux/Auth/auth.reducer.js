import { AUTH_GETUSER, AUTH_GET_VISITED_USER, AUTH_LOGIN, AUTH_LOGOUT, AUTH_SIGNUP, AUTH_UPDATE_USER, START_LOADING, STOP_LOADING } from "./auth.types.js";

const intialState={
    loading: false,
    error: false,
    isAuth: false,
    user:{},
    visitedUser:{},
    showLoading:false,
}

export const authReducer = (state=intialState, {type,payload})=>{
    switch(type){
        case AUTH_LOGIN:{
            return {
                ...state,
                isAuth: true,
                user:payload
            }; 
        }
        case AUTH_SIGNUP:{
            return {
                ...state,
            }; 
        }
        case AUTH_LOGOUT:{
            return {
                ...state,
                isAuth:false,
                user:null
            }; 
        }
        case AUTH_GETUSER:{
            return {
                ...state,
                isAuth:true,
                user:payload
            }
        }
        case AUTH_GET_VISITED_USER:{
            return {
                ...state,
                visitedUser:payload.user
            }
        }
        case AUTH_UPDATE_USER:{
            return{
                ...state,
                user:payload
            }
        }
        case START_LOADING:{
            return{
                ...state,
                showLoading:true,
            }
        }
        case STOP_LOADING:{
            return{
                ...state,
                showLoading:false,
            }
        }
       default:{
            return state;
       }
    }
    
}