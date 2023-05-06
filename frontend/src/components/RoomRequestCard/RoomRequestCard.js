import React, { useEffect } from 'react'
import { Box, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cardImage from '../../images/Order Placed.png'
import useStyles from './styles.js'
import { updateTenant } from '../../actions/Tenants';
import { getTenantsByUserId } from '../../actions/Tenants';
import { bookRoom, getRoomsByRoomId } from '../../actions/Rooms';
import { deleteRoomRequest } from '../../actions/RoomRequests';
import Swal from 'sweetalert2'
import * as api from '../../api/index'
function RoomRequestCard({ roomRequest, setCurrentId }) {

    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();

    useEffect(() => {

    }, [])
    const allow = () => {

        console.log(roomRequest)
        Swal.fire({
            title: 'Are you sure you want to allow this tenant?',
            showCancelButton: true,
            confirmButtonText: 'Allow',
            }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                
                await api.bookRoom(roomRequest.room_id, roomRequest.user_id, roomRequest.hostel_id)
                await api.deleteRoomRequest(roomRequest._id)
                Swal.fire('Tenant added!', '', 'success').then(()=>{
                    window.location.reload(false)
                })
                // dispatch(bookRoom(roomRequest.room_id, roomRequest.user_id, roomRequest.hostel_id)).then(()=>{
                //     Swal.fire('Tenant added!', '', 'success')
                // })
               // dispatch(deleteRoomRequest(roomRequest._id))         

            }
        })
        //Todo now delete this room request 
    }
    const dismiss = () => {
        //console.log(roomRequest._id)
        Swal.fire({
            title: 'Are you sure you want to delete this request?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                
                const tenantForm = {
                    has_booked: false
                }
                await api.deleteRoomRequest(roomRequest._id) 
                //update tenant so his has_booked is false again 
                const {data} = await api.getTenantsByUserId(roomRequest.user_id)
                await api.updateTenant(data._id,tenantForm)
                Swal.fire('Deleted!', '', 'success').then(()=>{
                    window.location.reload(false)
                })
                
            }
        })
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <CardMedia
                className={classes.media}
                image={cardImage}
            >
            </CardMedia>
            <CardContent className={classes.overlay}>
                <Typography gutterBottom variant='h5' component='div'>
                    {roomRequest.user_name}
                </Typography>
                <Typography variant='body2' >
                    Room #{roomRequest.room_number}
                </Typography>
                <Typography variant='body2' >
                    {roomRequest.user_phone}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' onClick={allow} style={{color:'#0C21C1'}} >Allow tenant</Button>
                <Button size='small' onClick={dismiss} style={{ marginTop: '30px',color:'#0C21C1' }}>Dismiss</Button>
            </CardActions>
        </Card>

    )
}

export default RoomRequestCard
