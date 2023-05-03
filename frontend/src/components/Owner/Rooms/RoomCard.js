import React,{useEffect, useState} from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import image from '../../../images/searching.png'
import useStyles from './styles.js'
function RoomCard({ room,setCurrentId }) {

   
    const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();
    //const {tenants} = useSelector((state) => state.tenants)
   // console.log(tenants)
    useEffect(()=>{
        // if(tenants.length === 0)dispatch(getTenantsByUserId(user?.result?._id))
     
    },[])
    
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date =new Date( room.next_vacancy_date)
    console.log(date)
  return (
    // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        
        
      true===false ?(<CircularProgress />) :
          (
              <Card raised elevation={6} className={classes.card}>
                  <CardMedia
                      className={classes.media}
                      image={image}
                  >

                  </CardMedia>
                  <CardContent className={classes.overlay}>
                      <Typography gutterBottom variant='h6' component='div'>
                          {room.room_number}
                      </Typography>
                      <Typography  variant='body2' >
                          Rent: {room.rent} Bdt
                      </Typography>
                      <Typography variant='body2' >
                          Area: {room.area} sqft
                      </Typography>
                      {/* <Typography>
                        ya re ba
                      </Typography> */}
                      {
                        date.getFullYear() == 3000?(
                            <Typography variant='body2' >
                                Occupied
                            </Typography>
                        ):
                        (
                            <Typography variant='body2' >
                                 Empty
                            </Typography>
                        )
                      }
                      
                      
                  </CardContent>
                  
              </Card>
          )


    //</Box>
    
  )
}

export default RoomCard