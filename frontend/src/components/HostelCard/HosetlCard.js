import React,{useEffect, useState} from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button, CircularProgress, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoomRequest } from '../../actions/RoomRequests';
import image from '../../images/rajanigandha.png'
import useStyles from './styles.js'
import { getHostelByHostelId } from '../../actions/hostels';
import { getTenantsByUserId } from '../../actions/Tenants';
import { leaveRoom } from '../../actions/Rooms';
import Swal from 'sweetalert2'
function HostelCard({ currentUser,currentHostel, currentTenant,setCurrentId }) {

    const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();


    // const {hostels} = useSelector((state) => state.hostels)
    // const {tenants} = useSelector((state) => state.tenants)
    useEffect(()=>{
        console.log(currentTenant)
        //Query to find the hostel associated with room.hostel_id 
        //
        // console.log('rapid fire')
        // setUser(JSON.parse(localStorage.getItem('profile')))
        // if(tenants.length===0)dispatch(getTenantsByUserId(user?.result?._id))
        // if(hostels.length===0)dispatch(getHostelByHostelId(room.hostel_id))
        
            
    },[])
    
    const date = new Date(currentTenant.starting_date)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const leave = ()=>{
        
        console.log('ekhane leave room marmu')
        console.log(currentTenant.room_id,currentTenant.user_id,currentHostel._id)
        Swal.fire({
        title: 'Are you sure you want to leave? this action cannot be reversed',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Leave',
        denyButtonText: `Stay`,
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            dispatch(leaveRoom(currentTenant.room_id,currentTenant.user_id,currentHostel._id)).then(()=>{
                Swal.fire('Saved!', '', 'success')
                navigate('/Homepage')
            })    
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
        })
        
        

        
    }
  return (
    // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        
      true === false ? (<CircularProgress />) :
          (
   
                    <Card   className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            image={image}
                        >

                        </CardMedia>
                        <CardContent className={classes.overlay}>
                            
                            <Typography  variant='body1' >
                                Hello {currentUser.result.name}! 
                            </Typography>
                            <Typography variant='body2' style={{marginLeft:'312px'}} >
                                Tenant since {monthNames[date.getMonth()]} {date.getFullYear()}
                            </Typography>
                            
                        </CardContent>

                        <CardContent className={classes.overlay2}>
                            
                            <Typography  gutterBottom variant='h4' >
                                You are living in {currentTenant.hostel_name}
                            </Typography>
                            <Typography variant='body2'  >
                                Every hostel has a meal system. That requires at least one grocery shopping chore per person, every month. With meal system, you get to enjoy home made quality meals everyday for lunch and dinner. Care to join?
                            </Typography>
                            
                        </CardContent>

                        <CardActions className={classes.cardActions}>
                            <Button onClick={leave} style={{color:'white'}}> Leave </Button>
                        </CardActions>
                        
                    </Card>

            
          )


    //</Box>
    
  )
}

        //{/* <Grid item xs={4}>
                //    <Button variant='contained'className={classes.cardActions}>
                  //  Join meal system
                   // </Button>
               // </Grid> */}
export default HostelCard
