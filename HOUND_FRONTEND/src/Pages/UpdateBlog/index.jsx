import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog } from "../../Redux/blogs/blog.action";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";



function UpdateBlog({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const attachmentInputRef = useRef(null);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { blogId } = useParams();
  const config = useMemo(
    () => ({
      readonly: false,
    //   placeholder: placeholder || "Start typing...",
      height: "500px",
      resize: 'auto'
      
    }),
    [placeholder]
  );
  const handleButtonAttach = () => {
    attachmentInputRef.current.click();
  };
  const handleAttachments = async (event) => {
    const allowedFileTypes = [
      "application/msword",
      "application/vnd.ms-excel",
      "application/pdf",
      "text/plain",
      "text/csv",
      "application/xml",
      "text/xml",
      "image/png",
      "image/webp",
      "image/jpeg",
    ];
    const file = event.target.files[0];
    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        alert("Selected file format is not supported");
        return;
      }
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/blog/uploadJodit-images`,formData);
        // console.log(res?.data);
        setContent(prevContent => `${prevContent}<img src="${res.data}" style="width:400px; height:400px" alt="Uploaded Image" />`);
      } catch (error) {
        setIsLoading(false);
        alert("Error uploading file. Please try again.")
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("No file selected.")
    }
  };
  const handleChangeTitle = (e) =>{
    setTitle(e.target.value);
  }
  const handleChangeCategory = (e) =>{
    setCategory(e.target.value);
  }

  const getSingleBlog = async () =>{
    try{
      setIsLoading(true);
       const response =  await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/blog/allBlogs/${blogId}`,{withCredentials: true});
      //  console.log(response);
       setContent(response?.data?.description);
       setTitle(response?.data?.title);
       setCategory(response?.data?.category)
    } catch(err){
      setIsLoading(false);
        console.log(err)
    } finally {
      setIsLoading(false);
    }
  }
  const handlePublish = async() =>{
    const data = {
      title: title,
      description: content,
      category: category
    }
   try{
    setIsLoading(true);
    // await axios.patch(`http://localhost:8000/api/v1/blog/update/${blogId}`, data, {withCredentials: true});
    const res= await updateBlog(blogId, data);
    if(res.sucess===true){
      toast.success("Blog Updated Successfully");
    }
    
   }
   catch(error){
    alert(error);
    setIsLoading(false);
   }finally{
    setIsLoading(false);
    navigate(`/blogs/${blogId}`)
   }
  }
  useEffect(()=>{
    getSingleBlog();
  },[]);
  return (
    <Box>
      <Stack spacing={2} sx={{ padding: "30px" }}>
        <TextField label="Enter Blog Title" sx={{width: "80%"}} value={title} onChange={(e)=>handleChangeTitle(e)}/>
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={category}
          label="Category *"
          onChange={(e)=>handleChangeCategory(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"Coding"}>Coding</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />
         <Button variant="outlined" onClick={handleButtonAttach} sx={{width: "15%"}}>Upload File</Button>
            <input
              type="file"
              onChange={handleAttachments}
              ref={attachmentInputRef}
              style={{ display: "none" }}
            />
        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button variant="contained" onClick={handlePublish}>Update Blog</Button>
        </Box>
      </Stack>
      {isLoading && <Loader/>}
    </Box>
  );
}
export default UpdateBlog;