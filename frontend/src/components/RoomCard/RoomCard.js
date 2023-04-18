import React from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button } from '@mui/material';
function RoomCard() {
  return (
    <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        <Card raised elevation={6}>
            <CardMedia
                component="img"
                height='200'
                image='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
            >

            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                Room card lets go
                </Typography>
                <Typography variant='body2' >
                Wee woo wee woo
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>Book now</Button>
            </CardActions>
        </Card>
    </Box>
    
  )
}

export default RoomCard
