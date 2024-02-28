import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import {  loginAPI } from "../Redux/Auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import signIn from "../Components/Images/signIn.svg"
import Loader from "../Components/Loader/Loader";

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

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth,showLoading } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);

  if(isAuth) {
    return <Navigate to='/' />
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    const formData = {
      email: data.get("email"),
      password: data.get("password")
    }
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please type a valid email address")
      return;
    }
    

    try {
      const result = await dispatch(loginAPI(formData));
        if(result.error){
          toast.warn(result.error);
          // alert(result.error)
          navigate("/login")
        }else{
          toast.success("Successfully logged in");
          // alert("Successfully logged in")
          navigate("/")
        }
     } catch (error) {
        console.log(error);
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
            backgroundImage:`url(${signIn})`,
              // "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
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
              Sign in
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                value={password}
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {showLoading && <Loader/>}
    </ThemeProvider>
  );
}
