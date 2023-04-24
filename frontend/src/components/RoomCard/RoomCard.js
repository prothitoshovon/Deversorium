import React from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoomRequest } from '../../actions/RoomRequests';
import image from '../../images/searching.png'
import useStyles from './styles.js'
function RoomCard({ room, setCurrentId }) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();
    const book = ()=>{

        //Use getTenant by userID 
        var date = new Date()
        const curForm = {user_id:userId, 
        user_name:user?.result?.name,
        room_id:room._id,
        room_number: room.room_number,
        hostel_id:room.hostel_id,
        hostel_name:'',
        date_issued: date
        }

        //console.log(curForm)
        dispatch(createRoomRequest(curForm))
        navigate('/THomepage')
        //When book is called 
        //We first validate if user has already booked before 
        //If yes , then prompt user that they can only book once
        //iF no , ask user to confirm if he wants to go on

    }
  return (
    // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        <Card raised elevation={6} className={classes.card}>
            <CardMedia
                className={classes.media}
                image={image}
            >

            </CardMedia>
            <CardContent className={classes.overlay}>
                <Typography gutterBottom variant='h5' component='div'>
                Hostel name address
                </Typography>
                <Typography variant='body2' >
                {room.rent} BDT
                </Typography>
                <Typography variant='body2' >
                {room.area} sqft
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' onClick={book}>Book now</Button>
            </CardActions>
        </Card>
    //</Box>
    
  )
}

export default RoomCard
