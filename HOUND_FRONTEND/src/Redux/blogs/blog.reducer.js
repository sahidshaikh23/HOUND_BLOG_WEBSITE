import { AUTH_GET_VISITED_USER } from "../Auth/auth.types"
import { GET_BLOGS, GET_Blog_COMMENTS, GET_CURRENTUSER_BLOGS, GET_LIKE_STATUS, GET_SINGLE_BLOG_DETAILS,  POST_Blog_COMMENTS_FAILURE,  POST_Blog_COMMENTS_REQUEST,  POST_Blog_COMMENTS_SUCCESS, START_LIKE_LOADING, START_LOADING, STOP_LIKE_LOADING, STOP_LOADING, UPDATE_LIKES } from "./blog.types"


const intialState={
    blogData:{},
    blogs:[],
    currentUserBlogs:[],
    count:null,
    totalPages:null,
    currentPage :null,
    comments:[],
    like:false,
    showLoading:false,
    error:false,
}



export const blogReducer =(state=intialState,{type,payload}) =>{
    switch(type){
        case GET_SINGLE_BLOG_DETAILS :{
            return{
                ...state,
                blogData: payload
            }
        }
        case GET_BLOGS:{
            return{
                ...state,
                blogs: payload.blogs,
                count: payload.count,
                currentPage: payload.currentPage,
                totalPages: payload.totalPages
            }
        }
        case GET_CURRENTUSER_BLOGS:{
            return{
                ...state,
                currentUserBlogs:payload
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
        // case GET_Blog_COMMENTS: {
        //     return{
        //         ...state,
        //         comments: payload
        //     }
        // }
        // case POST_Blog_COMMENTS_REQUEST: {
        //     return{
        //         ...state,
        //         loading: true
        //     }
        // }
        // case POST_Blog_COMMENTS_SUCCESS: {
        //     return{
        //         ...state,
        //         comments: [...state.comments, payload],
        //         loading: false
        //     }
        // }
        // case POST_Blog_COMMENTS_FAILURE: {
        //     return{
        //         ...state,
        //         loading: false,
        //         error:payload
        //     }
        // }
        case UPDATE_LIKES: {
            return{
                ...state,
                like: payload
            }
        }
        case GET_LIKE_STATUS: {
            return{
                ...state,
                like: payload
            }
        }
        case AUTH_GET_VISITED_USER:{
            return{
                ...state,
                blogs:payload.blogs
            }
        }
        case START_LIKE_LOADING:{
            return{
                ...state,
                showLoading: true
            }
        }
        case STOP_LIKE_LOADING:{
            return{
                ...state,
                showLoading: false
            }
        }
        default :{
          return state
        }
    }
}