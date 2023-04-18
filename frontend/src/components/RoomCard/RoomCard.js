import React from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function RoomCard({ room, setCurrentId }) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const book = ()=>{
        //When book is called 
        //We first validate if user has already booked before 
        //If yes , then prompt user that they can only book once
        //iF no , ask user to confirm if he wants to go on
    }
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
                Will need to query for Hostel name and address
                </Typography>
                <Typography variant='body2' >
                {room.rent} BDT
                </Typography>
                <Typography variant='body2' >
                {room.area} sqft
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
