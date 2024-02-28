import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postBlog } from "../../Redux/blogs/blog.action";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";


function CreateBlog({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const attachmentInputRef = useRef(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
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
        toast.error("Selected file format is not supported");
        return;
      }
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", file);
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/blog/uploadJodit-images`, formData);

        setContent(prevContent => `${prevContent}<img src="${res.data}" style="height:400px; width:400px;" alt="Uploaded Image" />`);
      } catch (error) {
        setIsLoading(false);
        toast.error("Error uploading file. Please try again.")
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("No file selected.")
    }
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }
  const handlePublish = async () => {
    const data = {
      title: title,
      description: content,
      category: category
    }
    try {
      setIsLoading(true);
      await postBlog(data)
      toast.success("Blog Created Successfully");
    }
    catch (error) {
      setIsLoading(false);
      toast.error(error);
    } finally {
      navigate("/")
      setIsLoading(false);
    }
  }
  return (
    <Box>
      <Stack spacing={2} sx={{ padding: "30px" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <TextField label="Enter Blog Title" sx={{ width: "80%" }} onChange={(e) => handleChangeTitle(e)} />
          <FormControl required sx={{ m: 1, width: 150 }}>
            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={category}
              label="Category *"
              onChange={(e) => handleChangeCategory(e)}
            >

             
              <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
              <MenuItem value={"Business"}>Business</MenuItem>
              <MenuItem value={"Coding"}>Coding</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Travel"}>Travel</MenuItem>
              <MenuItem value={"Education"}>Education</MenuItem>
              <MenuItem value={"Uncategorized"}>Uncategorized</MenuItem>
              <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
              <MenuItem value={"Social"}>Social</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />
        <Button variant="outlined" onClick={handleButtonAttach} sx={{ width: "15%" }}>Upload File</Button>
        <input
          type="file"
          onChange={handleAttachments}
          ref={attachmentInputRef}
          style={{ display: "none" }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handlePublish}>Publish</Button>
        </Box>
      </Stack>
      {isLoading && <Loader />}
    </Box>
  );
}
export default CreateBlog;
