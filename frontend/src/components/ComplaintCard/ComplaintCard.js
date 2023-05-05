import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button, CircularProgress, Grid, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoomRequest } from '../../actions/RoomRequests';
import image from '../../images/searching.png'
import quote from '../../images/quote.png'
import useStyles from './styles.js'
import { getHostelByHostelId } from '../../actions/hostels';
import { getTenantsByUserId } from '../../actions/Tenants';
import Swal from 'sweetalert2'
import { deleteComplaint } from '../../actions/Complaints';
function ComplaintCard({ complaint, setCurrentId }) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();

    useEffect(() => {
    }, [])


    const dismiss = () => {
        //Delete this 
        Swal.fire({
            title: 'Are you sure this complaint was resolved ?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(deleteComplaint(complaint._id))
                Swal.fire('Saved!', '', 'success')
            }
        })
    }
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={image}
            >

            </CardMedia>
            <CardContent className={classes.overlay2}>
                <Typography variant='body2' color='textSecondary' >
                    Room #{complaint.room_number}
                </Typography>
                <Typography gutterBottom variant='h6' >
                    {complaint.description}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button onClick={dismiss}style={{color:'#0C21C1'}} >Dismiss</Button>
            </CardActions>
        </Card>
    )

}

export default ComplaintCard
