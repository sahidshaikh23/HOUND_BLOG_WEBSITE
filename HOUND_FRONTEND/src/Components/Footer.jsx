import React from 'react';
import { AppBar, Box, Container, Link, Toolbar, Typography,useTheme,useMediaQuery } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="static" color="primary" sx={{display:"flex", alignItems:"center",p:2 }}>
      <Container>
        <Toolbar sx={{  ...(isSmallScreen && {flexDirection:"column" })}}>
          <Typography variant="body2" color="inherit" sx={{ flexGrow: 1,...(isSmallScreen && {fontSize:"12px",flexDirection:"row",pb:1 }) }}>
            © {new Date().getFullYear()} HOUND All Rights Reserved
          </Typography>
          <Box sx={{display:"flex",
            }}>
              <Box sx={{display:"flex",...(isSmallScreen && {alignItems:"baseline" })}}>
            <Typography variant="body2" color="inherit" sx={{ marginRight: 2,...(isSmallScreen && {fontSize:"12px",flexDirection:"row",pb:1 }) }}>
              Created by Team Members:
            </Typography>
            <Link  href="https://www.linkedin.com/in/sahidshaikh/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{textDecoration:"none", marginLeft: 1 }}>
               <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
               Sahid Shaikh
              </Typography>
            </Link>
            <Link href="https://www.linkedin.com/in/pratik-malunjkar-17233125b/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ marginLeft: 1,textDecoration:"none" }}>

              <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
                Pratik Malunjkar
              </Typography>
            </Link>
            </Box>
              <Box sx={{display:"flex"}}>
                <Link href="#" color="inherit" sx={{ marginLeft: 2,textDecoration:"none" }}>
                  <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
                    Privacy Policy
                  </Typography>
                </Link>
                <Link href="#" color="inherit" sx={{ marginLeft: 2,textDecoration:"none" }}>

                  <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
                  Terms of Service
                  </Typography>
                </Link>
                <Link href="#" color="inherit" sx={{ marginLeft: 2,textDecoration:"none" }}>

                  <Typography sx={{...(isSmallScreen && {fontSize:"10px" })}} variant="body2" color="inherit">
                  Contact Us
                  </Typography>
                </Link>
                </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
