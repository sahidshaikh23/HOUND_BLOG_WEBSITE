import React from 'react'
import { Box, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography,
    useMediaQuery,
    useTheme, 
} from '@mui/material';
import { Link } from 'react-router-dom';

function TableComponent({currentUserBlogs}) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{textAlign:"center", justifyContent:"center",overflow:"hidden"}}>
            <Typography variant="h6" sx={{overflow:"hidden"}} >Recent Posts</Typography>
                    <TableContainer 
                    component={Paper} 
                    sx={{ 
                        maxHeight: 440,  
                        overflow: 'auto',
                        ...(isSmallScreen && { width: '80%',margin:"auto", overflowX: 'auto' })
                    }}>
                        <Table sx={{ 
                            minWidth: 650,
                            ...(isSmallScreen && { width: '60%',margin:"auto", overflowX: 'auto' })
                            }}  stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black", borderRight:"1px solid white"}}>S.No</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Blog Title</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Category</TableCell>
                            <TableCell sx={{backgroundColor:"#87CEEB", color:"black",borderRight:"1px solid white"}}>Published Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                {currentUserBlogs?.map((el,index)=>(
                            <TableRow
                                key={el._id}
                            >
                                <TableCell component="th" scope="row">
                                  {index+1}
                                </TableCell>
                                <TableCell sx={{"&:hover":{
                                                fontWeight:"800",
                                            }}}>
                                        <Link style={{
                                            color:"inherit", 
                                            textDecoration:"none",
                                            
                                            }} to={`/blogs/${el._id}`}>{el.title}</Link></TableCell>
                                <TableCell >{el.category}</TableCell>
                                <TableCell >{new Date(el.updatedAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        </TableContainer>
        </Box>
  )
}

export default TableComponent