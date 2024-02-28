import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../Redux/blogs/blog.action';
import styled from "styled-components"
import moment from 'moment';
import NoBlogFound from './NoBlogFound';
import Loader from './Loader/Loader';

function Homepage() {
  const {isAuth,user} = useSelector(state=>state.auth);
  const { blogs, count, totalPages, currentPage, showLoading } = useSelector(state => state.blog);
  // console.log( isAuth )

  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(false);
  const handleChangeCategory = (cat)=>{
    setCategory(cat)
    setIsActive(!isActive);
  }

  useEffect(()=>{
    // getData(page)
    dispatch(getAllBlogs(page,category));
    // dispatch(getUser());
    // (isAuth && dispatch(getUser()))
  },[dispatch,page,category])

  if (!blogs || blogs.length === 0) {
    return <NoBlogFound/>;
  }


  // const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('accessToken='))?.split('=')[1]
  return (
    <>
      <Box sx={{display:"flex",alignItems:"center",width:"80%",margin:"auto",mt:3}}>
        <Typography>CATEGORIES:-</Typography>
        <Grid container justifyContent="space-around" sx={{ mt: { xs: 2, md: 0 } }}  >
          <Button variant={category === '' ? 'contained' : 'text'} color="primary"  onClick={()=>handleChangeCategory('')}>All</Button>
          <Button variant={category === 'Travel' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Travel')}>Travel</Button>
          <Button variant={category === 'Coding' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Coding')}>Coding</Button>
          <Button variant={category === 'Business' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Business')}>Business</Button>
          <Button variant={category === 'Agriculture' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Agriculture')}>Agriculture</Button>
          <Button variant={category === 'Education' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Education')}>Education</Button>
          <Button variant={category === 'Uncategorized' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Uncategorized')}>Uncategorized</Button>
          <Button variant={category === 'Entertainment' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Entertainment')}>Entertainment</Button>
          <Button variant={category === 'Social' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Social')}>Social</Button>
          <Button sx={{ mx: 1, mt: { xs: 1, md: 0 } }} variant={category === 'Food' ? 'contained' : 'text'} onClick={()=>handleChangeCategory('Food')}>Food</Button>
        </Grid>
      </Box>

      {
        blogs?.map((el)=>(
          <div key={el?._id} style={{width:"80%",margin:'auto',marginTop:"50px"}}>
             <Link to={`/blogs/${el?._id}`} style={{textDecoration:"none",color:'black'}} >
              <OuterContainerStyles key={el?._id} style={{padding: "30px 0px"}}>
                  <div style={{margin:"30px"}}>
                    <h3>Title: {el?.title}</h3>
                    <div style={{width:'80%', padding:"20px",maxHeight:"300px",overflow:"hidden"}} dangerouslySetInnerHTML={{ __html: el?.description }}/>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px',marginLeft:"20px",marginTop:"10px" }}>
                              <Typography variant="body2" color="textSecondary">
                              {el?.totalLikes} Likes
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                              {el?.commentsCount} Comments
                              </Typography>
                          </div>
                    </div>

                  <div style={{display:"flex",margin:"30px"}}>
                    <img style={{width:"50px", height:"50px",  borderRadius: "50%",}} src={el?.owner?.profileImage} alt="" />
                    <div style={{ marginLeft: '15px'}}>
                    <Typography variant="body1">
                      Author: {el?.owner?.userName}
                    </Typography>
                    <Typography variant='subtitle2' color="textSecondary">
                   Published {moment(el?.createdAt).fromNow()}
                    </Typography>
                    </div>
                </div>
                </OuterContainerStyles>
                </Link>
          </div>
        ))
      }

<Stack spacing={2} justifyContent="center" alignItems="center" mt={3} pb={5}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event,value)=>setPage(value)}
          color="primary"
        />
      </Stack>
    {showLoading && <Loader/>}
    </>
  )
}

export default Homepage;

const OuterContainerStyles = styled.div`
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  margin-left: 24px;
  margin-right: 24px;
  margin-top: ${(props) => props.marginTop ?? "0px"};
  margin-bottom: ${(props) => props.marginBottom ?? "0px"};
`;


