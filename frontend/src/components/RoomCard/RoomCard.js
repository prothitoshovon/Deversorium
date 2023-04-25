import React,{useEffect, useState} from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoomRequest } from '../../actions/RoomRequests';
import image from '../../images/searching.png'
import useStyles from './styles.js'
import { getHostelByHostelId } from '../../actions/hostels';
import { getTenantsByUserId } from '../../actions/Tenants';
function RoomCard({ room, setCurrentId }) {

    const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();
    const {hostels} = useSelector((state) => state.hostels)
    const {tenants} = useSelector((state) => state.tenants)
    useEffect(()=>{
        
        //Query to find the hostel associated with room.hostel_id 
        //
        console.log('rapid fire')
        setUser(JSON.parse(localStorage.getItem('profile')))
        if(tenants.length===0)dispatch(getTenantsByUserId(user?.result?._id))
        if(hostels.length===0)dispatch(getHostelByHostelId(room.hostel_id))
        
            
    },[])
    
    
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
         console.log(hostels)
         console.log(tenants)
        if(tenants[0].has_booked === true)prompt('you already have a booking')
        else
        {
            const confirm  = prompt('You can only book one room at a time.Type confirm and ok to Continue?','confirm')
            dispatch(createRoomRequest(curForm))
            window.location.reload(false)
        }
        


        //When book is called 
        //We first validate if user has already booked before 
        //If yes , then prompt user that they can only book once
        //iF no , ask user to confirm if he wants to go on

    }
  return (
    // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        
      hostels.length === 0 ? (<CircularProgress />) :
          (
              <Card raised elevation={6} className={classes.card}>
                  <CardMedia
                      className={classes.media}
                      image={image}
                  >

                  </CardMedia>
                  <CardContent className={classes.overlay}>
                      <Typography gutterBottom variant='h6' component='div'>
                          {hostels.name}
                      </Typography>
                      <Typography  variant='body2' >
                          Address: {hostels.address}
                      </Typography>
                      <Typography variant='body2' >
                          Rent: {room.rent} BDT
                      </Typography>
                      <Typography variant='body2' >
                          Area: {room.area} sqft
                      </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                      <Button size='small' onClick={book}>Book now</Button>
                  </CardActions>
              </Card>
          )


    //</Box>
    
  )
}

export default RoomCard
