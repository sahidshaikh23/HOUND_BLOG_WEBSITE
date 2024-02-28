import { Box, Typography } from '@mui/material'
import React from 'react'

function NoBlogFound() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6">No blogs found</Typography>
      <Typography variant="body1">Sorry, there are no blogs available at the moment.</Typography>
    </Box>
  )
}

export default NoBlogFound