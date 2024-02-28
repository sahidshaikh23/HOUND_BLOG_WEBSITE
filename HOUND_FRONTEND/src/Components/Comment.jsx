import { Avatar, Box,useTheme,useMediaQuery, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { updateComment } from '../Redux/blogs/blog.action.js';
import { Link } from 'react-router-dom';

function Comment({comment,onEdit,currentUser,onDelete,blogId}) {
  const {user} = useSelector(state=>state.auth);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(comment.content);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(comment._id);
  // console.log(comment.profileImage);
  // console.log({"user._id":user._id, "comment.commentBy._id":comment.commentBy._id});
    const isOwner = comment.commentBy._id === user._id;


    const handleEdit = () => {
      setEditMode(true);
    };

    const handleCancel = () => {
      setEditMode(false);
    };

    const handleSave = async() => {
      try {
       const UpdatedComment = await updateComment(blogId,{content},comment._id)
       onEdit(UpdatedComment.data)
       console.log(UpdatedComment);
        setEditMode(false);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Card >
        <CardContent sx={{...(isSmallScreen && {padding: '8px'})}}>
          <Box sx={{display:"flex", alignItems:"center",gap:"10px"}}>
            <Avatar src={comment?.commentBy?.profileImage} alt={comment?.commentBy?.userName}/>
            <Box sx={{display:"flex",flexDirection:"column"}}>
              <Box sx={{display:"flex", gap:"10px", alignItems:"center"}}>
              <Link to={`/user/${comment?.commentBy?._id}`}
              style={{
                textDecoration:'none',
                color:'inherit',
                // ':hover':{
                //   color:'grey'
                // }
                // ...(isSmallScreen && {width:"250px"})
                }}>
                <Typography 
                    fontWeight="700" 
                    sx={{  '&:hover': {
                      color: 'gray',
                    }}}
                    >{comment?.commentBy?.fullName}</Typography>
                </Link>
                {editMode ? (
              <TextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: '30%' }}
              />
            ) : (
              <Typography  variant='subtitle2'>{comment.content}</Typography>
            )}
              </Box>
                <Typography style={{ fontSize: '13px',paddingTop:"5px",
                  ...(isSmallScreen && {fontSize: '10px'})
              }}> Posted   {moment(comment.updatedAt).fromNow()}</Typography>
          </Box>
            {isOwner &&( <Box sx={{display:"flex",gap:"10px"}}>

              {isSmallScreen ? (
              <>
                  <EditIcon
                  color="primary"
                  sx={{ fontSize: '20px', cursor: 'pointer' }}
                  onClick={() => handleEdit(comment._id)}
                  />
                  <DeleteIcon
                  color="secondary"
                  sx={{ fontSize: '20px', cursor: 'pointer' }}
                  onClick={() => onDelete(blogId, comment._id)}
                  /> 
              </>
              ):(
                <>
                  <Button variant="outlined" color="primary"
                  onClick={()=>handleEdit(comment._id)}>Edit</Button>
                  <Button variant="outlined" color="secondary"
                  onClick={()=>onDelete(blogId,comment._id)}>Delete</Button>
                </>
              )}
              </Box>)}
          </Box>
            
            {/* {isOwner &&( <div>
                <Button variant="outlined" color="primary" onClick={()=>onEdit(comment._id)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={()=>onDelete(blogId,comment._id)}>Delete</Button>
            </div>)} */}


<Dialog open={editMode} onClose={handleCancel}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </CardContent>
    </Card>
  )
}

export default Comment