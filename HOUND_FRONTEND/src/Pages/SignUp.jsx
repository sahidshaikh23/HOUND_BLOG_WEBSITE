import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signUpAPI } from "../Redux/Auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { InputAdornment } from "@mui/material";
import Loader from "../Components/Loader/Loader";
import SignUp from "../Components/Images/SignUp.svg"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://hound-frontend-service.vercel.app/">
        HOUND
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const {showLoading} = useSelector(state=>state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   fullName: data.get("fullName"),
    //   userName: data.get("userName"),  
    //   email: data.get("email"),
    //   password: data.get("password")
    // });
    
  const ToUpperFullName =(str)=>{
    var arr = str.split(" ")
    var res = arr.map((el)=>{
        return el.replace(el.charAt(0), el.charAt(0).toUpperCase())
    })
    return res.join(" ")
  }
  const capitalizedFullName = ToUpperFullName(data.get("fullName"));
  // console.log(capitalizedFullName)
    const formData = {
      fullName: capitalizedFullName,
      userName: data.get("userName"),  
      email: data.get("email"),
      password: data.get("password")
    }
    console.log("fullName",formData.fullName)
    console.log(formData)

    if (!formData.email || !formData.password || !formData.fullName || !formData.userName) {
      toast.error("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please type a valid email address")
      return;
    }
    if (formData.password.length <=5) {
      toast.error("Password must be at least 5 characters")
      return;
    }
    

    try {
      const result = await dispatch(signUpAPI(formData))
      if(result.error){
        console.log(result.error)
        toast.warn(result.error)
        navigate("/signup")
      }else{
        toast.success("Successfully Registered")
        navigate("/login")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:`url(${SignUp})`,
              // "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "auto",
            backgroundPosition: "center",
            backgroundmaxWidth: "100%",
            backgroundHeight:"auto"
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
                <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="fullName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                // autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                // autoFocus
              />
              <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{cursor:"pointer"}} onClick={()=>setshowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {showLoading && <Loader/>}
    </ThemeProvider>
  );
}
