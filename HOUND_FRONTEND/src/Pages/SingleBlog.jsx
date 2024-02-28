import React, { useCallback, useEffect, useState } from 'react'
import { deleteBlog, deleteComment, getBlogComments, getLikeStatus, getSingleBlogData, likeAndUnlike, postComment } from '../Redux/blogs/blog.action'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentList from '../Components/CommentList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Box, Button, useTheme, useMediaQuery, IconButton, CircularProgress, Avatar, Typography, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'
import moment from 'moment';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader/Loader';

function SingleBlog() {
    axios.defaults.withCredentials = true;
    const { blogData, like, showLoading } = useSelector(state => state.blog)
    // const {loading,comments,error} = useSelector(state=>state.blog)
    // const {like} = useSelector(state=>state.blog)
    // console.log(like)   //result : true

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const { user } = useSelector(state => state.auth)
    const [isLiked, setIsLiked] = useState(like);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // console.log("current lIke state",isLiked) //result : false
    const [allLikes, setAllLikes] = useState(blogData?.totalLikes);
    const [content, setNewContent] = useState('');
    const [commentsData, setcommentsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const newLikeStatus = dispatch(getLikeStatus(id));
    // console.log("newLikeStatus",newLikeStatus)

    // console.log(blogData)
    // console.log(blogData.owner)




    // console.log(id)

    const fetchComments = useCallback(async () => {

        try {
            const data = await getBlogComments(id)
            setcommentsData(data)

        } catch (error) {
            console.log(error)
        } finally {
        }
    }, [id])

    const isBlogOwner = blogData?.owner?._id === user?._id
    // console.log("isBlogOwner",isBlogOwner)
    // console.log(blogData?.owner._id,user?._id)

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            deleteBlog(id)
        } catch (error) {
            setIsLoading(false);
            console.log(error.message)
        } finally {
            setIsLoading(false);
            toast.success("Successfully Deleted Blog");
            // alert("Blog successfully deleted")
            navigate("/")
        }
    }

    const handleUpdateComment = async (updatedComment) => {
        console.log(updatedComment)
        const data = commentsData.map((el) => el._id === updatedComment._id ? updatedComment : el)
        setcommentsData(data)
        fetchComments(id)
        console.log(data)        // setcommentsData([data,...commentsData])
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                dispatch(getSingleBlogData(id))

            } catch (error) {
                setIsLoading(false);
                console.log(error.message)
            } finally {
                setIsLoading(false);
            }
        }
        fetchData()
        // dispatch(getLikeStatus(id))
        // fetchComments()
        // setIsLiked(like)
        // dispatch(getSingleBlogData(id))
        // dispatch(getLikeStatus(id))
        // fetchComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, allLikes])
    // console.log(commentsData)

    const getStatus = async () => {
        try {
            const data = await getLikeStatus(id)
            setIsLiked(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStatus()
        // dispatch(getLikeStatus(id))
        // setIsLiked(like)
    }, []);

    useEffect(() => {
        fetchComments()
    }, []);

    if (blogData?.length === 0) {
        return (<>
            <h1>Blogs Not available</h1>
        </>)
    }

    const handleLikeClick = async () => {
        if (!user) {
            alert("Login to like the blog")
        }
        setLikeLoading(true)
        setIsLiked(!isLiked);
        try {
            await dispatch(likeAndUnlike(id))
            if (isLiked) {
                setAllLikes(allLikes - 1);
            }
            setAllLikes(allLikes + 1);

        } catch (error) {
            console.error(error.message)
        } finally {
            setLikeLoading(false)
        }
    };

    const handleDeleteComment = async (id, commentId) => {
        setIsLoading(true);
        try {
            const data = await deleteComment(id, commentId)
            console.log(data)
        } catch (error) {
            setIsLoading(false);
            console.log(error.message)
        } finally {
            setIsLoading(false);
            fetchComments(id)
        }
    }

    const handlePost = async (event) => {
        event.preventDefault();
        if (!content) {
            toast.error("Please enter a comment")
            return
        }
        setIsLoading(true);
        try {
            const data = await postComment(id, { content })
            console.log(data)
            setcommentsData([data, ...commentsData]);
            fetchComments(id)
            setNewContent("")
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message)
            console.error(error.message)
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <div>
            <div style={{ width: "80%", margin: 'auto', marginTop: "50px" }}>
                <div style={{ padding: '30px 0px', background: "#fff", boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.1)" }}>
                    <Typography style={{ fontSize: "35px", marginLeft: "30px", ...(isSmallScreen && { fontSize: "25px" }) }}>{blogData?.title}</Typography>
                    <Typography style={{ marginLeft: "30px", color: "grey" }}>Category :- {blogData?.category}</Typography>
                    {/* <h1>{blogData?.title}</h1> */}
                    <div style={{ padding: "40px" }} dangerouslySetInnerHTML={{ __html: blogData?.description }} />
                    <Link to={`/user/${blogData?.owner?._id}`}
                        style={{
                            marginLeft: "40px",
                            textDecoration: 'none',
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
                            padding: '8px',
                            borderRadius: "5px",
                            width: "300px",
                            ...(isSmallScreen && { width: "250px" })
                        }}>

                        <Avatar sx={{ height: '70px', width: '70px', marginLeft: "15px", ...(isSmallScreen && { height: '55px', width: '55px' }) }} src={blogData?.owner?.profileImage} />
                        {/* <Typography variant='h6'>{blogData?.owner?.fullName}</Typography> */}
                        <Box>
                            <Typography variant="h6" fontWeight="bold" sx={{ ...(isSmallScreen && { fontSize: "1rem" }) }}>
                                {blogData?.owner?.fullName}
                            </Typography>
                            <Typography variant='subtitle2' color="textSecondary" sx={{ ...(isSmallScreen && { fontSize: "10px" }) }}>
                                Published {moment(blogData?.createdAt).fromNow()}
                            </Typography>
                        </Box>
                    </Link>
                    {/* <p>Likes:{blogData?.totalLikes}</p> */}
                    <div style={{ display: "flex", alignItems: "center", marginTop: "15px", marginLeft: '30px', }}>
                        <IconButton onClick={handleLikeClick}>
                            {showLoading ? (
                                <CircularProgress />
                            ) : (
                                <FavoriteIcon sx={{ width: 35, height: 35 }} style={{ color: isLiked ? 'red' : 'grey' }} />
                            )}

                        </IconButton>
                        <Typography variant="h5" >{blogData?.totalLikes}</Typography>
                        <CommentIcon sx={{ width: 35, height: 35, marginLeft: "25px", marginRight: "10px" }} />
                        <Typography variant="h5" >{blogData?.commentsCount}</Typography>
                    </div>
                    {isBlogOwner &&
                        <Box sx={{ marginLeft: "40px", display: "flex", gap: "25px" }}>
                            <Button onClick={() => navigate(`/updateBlog/${id}`)} variant="contained" startIcon={<EditIcon />}
                                color="primary">Edit</Button>
                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
                        </Box>
                    }
                </div>
                <Typography style={{ fontSize: "25px", marginLeft: "30px", ...(isSmallScreen && { fontSize: "15px" }) }}>Add a Comment</Typography>
                <Box sx={{ display: "flex", gap: "25px" }}>
                    <TextField
                        placeholder="Write your comment..."
                        minRows={3}
                        style={{ width: '400px' }}
                        value={content}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePost}
                        sx={{ ...(isSmallScreen && { fontSize: "12px" }) }}>
                        Post Comment
                    </Button>
                </Box>
                <Typography sx={{ marginLeft: 3, marginsTop: 1 }}>Comments:</Typography>
                {/* {error && <div>Error: {error}</div>} */}
                {loading ? (<CircularProgress />) : (<CommentList
                    comments={commentsData}
                    currentUser={user?._id}
                    onDelete={handleDeleteComment}
                    blogId={id}
                    onEdit={handleUpdateComment}
                />)}
            </div>
            {isLoading && <Loader />}
        </div>
    )
}

export default SingleBlog