import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import image from './Images/404.jpg'

function PageNotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      paddingBottom="30px"
    >
      <Box>

      <img src={image} alt='404 Page Not Found' style={{ width:"400px" }}/>
      </Box>
      <Typography variant="h5" color="textSecondary" paragraph>
        Page not found
      </Typography>
      <Button variant="contained" color="primary" element={Link} to="/">
        Go to Home
      </Button>
    </Box>
  )
}

export default PageNotFound