import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
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
import * as api from '../../api/index'
function HostelCard({ currentUser, currentHostel, currentTenant, setCurrentId }) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();

    useEffect(() => {


    }, [])

    const date = new Date(currentTenant[0].starting_date)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const leave = async() => {
        try {
            console.log('ekhane leave room marmu')
        console.log(currentTenant.room_id, currentTenant.user_id, currentHostel._id)
        Swal.fire({
            title: 'Are you sure you want to leave? this action cannot be reversed',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Leave',
            denyButtonText: `Stay`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await api.leaveRoom(currentTenant[0].room_id,currentTenant[0].user_id,currentHostel[0]._id)
                Swal.fire('Saved!', '', 'success').then(()=>{
                    navigate('/Homepage')
                })
                
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
            
        } catch (error) {
            
        }
        

    }
    return (

        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={image}
            >

            </CardMedia>
            <CardContent className={classes.overlay}>

                <Typography variant='body1' >
                    Hello {currentUser.result.name}!
                </Typography>
                <Typography variant='body2' style={{ marginLeft: '312px' }} >
                    Tenant since {monthNames[date.getMonth()]} {date.getFullYear()}
                </Typography>

            </CardContent>

            <CardContent className={classes.overlay2}>

                <Typography gutterBottom variant='h4' >
                    You are living in {currentTenant[0].hostel_name}
                </Typography>
                <Typography variant='body2'  >
                    Every hostel has a meal system. That requires at least one grocery shopping chore per person, every month. With meal system, you get to enjoy home made quality meals everyday for lunch and dinner. Care to join?
                </Typography>

            </CardContent>

            <CardActions className={classes.cardActions}>
                <Button onClick={leave} style={{ color: 'white' }}> Leave </Button>
            </CardActions>

        </Card>



    )
}

//{/* <Grid item xs={4}>
//    <Button variant='contained'className={classes.cardActions}>
//  Join meal system
// </Button>
// </Grid> */}
export default HostelCard
