import React, { useEffect } from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button } from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cardImage from '../../images/Order Placed.png'
import useStyles from './styles.js'
import { updateTenant } from '../../actions/Tenants';
import { getTenantsByUserId } from '../../actions/Tenants';
import { bookRoom, getRoomsByRoomId } from '../../actions/Rooms';
function RoomRequestCard({ roomRequest, setCurrentId }) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();
    const {rooms} = useSelector((state)=> state.rooms)
    const {tenants} = useSelector((state) => state.tenants)
    
    useEffect(()=>{
        //Here we will query the tenant 
        console.log(roomRequest.room_id)
        dispatch(getTenantsByUserId(roomRequest.user_id))
        dispatch(getRoomsByRoomId(roomRequest.room_id))
            
    },[])
    const allow = ()=>{
        
        dispatch(bookRoom(rooms[0]._id, tenants[0]._id))
        //Now to just dispatch
        //Book room

        

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
