import React from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cardImage from '../../images/Order Placed.png'
import useStyles from './styles.js'
import { updateTenant } from '../../actions/Tenants';
function RoomRequestCard({ roomRequest, setCurrentId }) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();
    // const {isLoading,rooms} = useSelector((state) => state.rooms)
    // useEffect(()=>{
  
    //     if(rooms.length == 0)dispatch(getHostelByOwnerId(user?.result?._id))        
          
    // },[])
    //TOOD QUERY TO FIND the ROOM associated with roomRequest.room_id 
    //TODO QUERY TO FIND the TENANT associated with roomRequest.user_id 
    const allow = ()=>{

        const initState = {
            assigned_room : true,
            room_id: roomRequest.room_id,
            room_number: roomRequest.room_number,
            hostel_id: roomRequest.hostel_id,
            user_id: roomRequest.user_id,
        }
        console.log(initState)
        dispatch(updateTenant(roomRequest.user_id, initState))

        console.log(roomRequest.user_id)

    }
    
  return (
    // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        <Card className={classes.card}raised elevation={6}>
            <CardMedia
                className={classes.media}
                image={cardImage}
            >
            </CardMedia>
            <CardContent className={classes.overlay}>
                <Typography gutterBottom variant='h5' component='div'>
                user's name
                </Typography>
                <Typography variant='body2' >
                Room number
                </Typography>
                <Typography variant='body2' >
                user's phone number
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' onClick={allow}>Allow tenant</Button>
            </CardActions>
        </Card>
    // </Box>
    
  )
}

export default RoomRequestCard
