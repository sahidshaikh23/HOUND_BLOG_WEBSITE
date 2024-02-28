import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Container, Grid, IconButton,useTheme,useMediaQuery, Typography } from '@mui/material'
import { Facebook, Twitter, GitHub, LinkedIn } from '@mui/icons-material';
import { currentFollowStatus, follow, getUserData, unfollow } from '../Redux/Auth/auth.actions.js'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader/Loader.jsx';
import TableComponent from './TableComponent.jsx';

function VisitedUser() {
    const {visitedUser,showLoading} = useSelector(state=>state.auth)
    const {user} =  useSelector(state=>state.auth)
    const {blogs} =  useSelector(state=>state.blog)
    const dispatch  = useDispatch()
    const [followStatus,setFollowStatus] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // console.log(id);
    // console.log(blogs);
    const isSelfUserPage = user._id === id
    // console.log(isSelfUserPage)
        const currentStatus = async()=>{
            const res = await currentFollowStatus(id)
            // console.log(res)
            setFollowStatus(res.data)
        }
    
    

    const handleFollow =async()=>{
        const data = await follow(id)
        if(data){
            setFollowStatus(data)
            // currentStatus(id)
            toast.success("followed successfully")
        }
        // console.log(data)
    }

    const handleUnFollow =async()=>{
        try {
            // console.log("status before unFollow",followStatus)
            let data = await unfollow(id)
            console.log(data)
                setFollowStatus(data)
                toast.success("Unfollowed successfully")
        } catch (error) {
            console.log(error.message)
        } 
    }
    useEffect(() =>{
        dispatch(getUserData(id))
        currentStatus(id)
    },[id,dispatch,followStatus])
    const handleBack = () => {
        navigate(-1)
      }

    // console.log(visitedUser)
   
  return (
    <>
     <Box sx={{ background: "linear-gradient(#f0f0f0, #e0e0e0)", paddingBottom:"65px" }}>
     <div>
            <Button onClick={handleBack}>back</Button>
        </div>
    <Container maxWidth="lg">
    <Grid sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent:"center", gap:"25px", alignItems:"center", pb:"30px" }}>
            <Box>
                <Avatar alt="User Avatar" src={visitedUser?.profileImage} sx={{ width: 100, height: 100 }} />
            </Box>
            <Box sx={{ display: 'flex',alignItems:"center"}}>
                <Box>
                    <Box>
                        <Typography variant="h5">{visitedUser?.fullName}</Typography>
                        {/* <Typography variant="subtitle1">Full Stack Web Developer</Typography> */}
                            <Box sx={{ display: 'flex',gap:"15px",
                             ...(isSmallScreen && {flexDirection:"column",gap:0 })
                        }}>
                                <Typography variant="subtitle1" sx={{...(isSmallScreen && {fontSize: '14px', })}}>Followers: {visitedUser?.followersCount}</Typography>
                                <Typography variant="subtitle1" sx={{...(isSmallScreen && {fontSize: '14px', })}}>Following: {visitedUser?.followingCount}</Typography>
                            </Box>
                    </Box>
                </Box>
                <Box sx={{pl:"30px"}}>
                    {isSelfUserPage  ? (<></>) : (<>{followStatus ? 
                            (<Button variant='contained' onClick={handleUnFollow}> UnFollow</Button>)
                            : (<Button variant='contained' onClick={handleFollow}> Follow</Button>)
                        }</>)}


                    {/* {followStatus ? 
                            (<Button variant='contained' onClick={handleUnFollow}> UnFollow</Button>)
                            : (<Button variant='contained' onClick={handleFollow}> Follow</Button>)
                        } */}
                    
                   {isSelfUserPage ? (
                    <Link to="/my-account">
                        <Button variant='contained'> Update</Button>
                    </Link>
                   ):<></>} 
                </Box>
            </Box>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center",
                 ...(isSmallScreen && {flexDirection:"column",gap:1,mb:1 })
    }}>
            <Box>
            <IconButton href="https://www.facebook.com/yourusername" target="_blank">
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com/yourusername" target="_blank">
          <Twitter />
        </IconButton>
        <IconButton href="https://github.com/yourusername" target="_blank">
          <GitHub />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/yourusername" target="_blank">
          <LinkedIn />
        </IconButton>
            </Box>
            <Box>
                <Typography variant="subtitle">Member Since {new Date(visitedUser?.createdAt).toLocaleDateString()}</Typography>
            </Box>
        </Box>
        <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Typography variant="h6">About Me</Typography>
            <Box>
                <Typography variant="subtitle">I love Writing Code </Typography>
            </Box>
        </Box>
    </Grid>
    <Box sx={{display:"flex",justifyContent:"center", alignItems:"center",  mt:"1rem"}}>
        <Box sx={{overflow:"hidden"}}>
        {/* <Typography variant="h6">Recent Posts</Typography> */}
            {/* {blogs?.map((el,index)=>(
                <Box key={el._id} sx={{display:"flex", flexDirection:"row",gap:"20px"}}>
                    <Typography variant="subtitle">Blog {index+1}</Typography>
                <Link to={`/blogs/${el._id}`}>  <Typography variant='subtitle'>{el.title}</Typography></Link>
                    <Typography variant='subtitle'>{new Date(el.updatedAt).toLocaleDateString()}</Typography>
                </Box>
            ))} */}
        <TableComponent currentUserBlogs={blogs} />

        {/* <TableContainer component={Paper} sx={{ maxHeight: 440,  overflow: 'hidden' }}>
                        <Table sx={{ minWidth: 650 }}  stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black", borderRight:"1px solid white"}}>S.No</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Blog Title</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Category</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Published Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                {blogs?.map((el,index)=>(
                            <TableRow
                                key={el._id}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 },}}
                            >
                                <TableCell component="th" scope="row">
                                  {index+1}
                                </TableCell>
                                <TableCell ><Link style={{color:"inherit", textDecoration:"none"}} to={`/blogs/${el._id}`}>{el.title}</Link></TableCell>
                                <TableCell >{el.category}</TableCell>
                                <TableCell >{new Date(el.updatedAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        </TableContainer> */}
        </Box>
    </Box>

    </Container>
    </Box>
    {showLoading && <Loader/>}
    </>
  )
}

export default VisitedUser