import React, { useState, useEffect } from 'react'
import { Button, Grid, Box, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase, CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cardImage from '../../../images/Order Placed.png'
import useStyles from './styles.js'
import { getuserbyuserid } from '../../../actions/Users';
import * as api from '../../../api/index'
import Swal from 'sweetalert2'
function TenantCard({ tenant, setCurrentId }) {

    //const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    //const {users, usersLoading} =  useSelector((state) => state.users)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [payment, setPayment] = useState(tenant.bill_paid)
    const fetchData = async () => {
        const { data } = await api.getuserbyuserid(tenant.user_id)
        console.log(data)
        setUsers([...users, data])
        setLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const confirmPayment = async () => {
        Swal.fire({
            title: 'Confirm Payment?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            denyButtonText: `Edit`,
            confirmButtonColor:'#0C21C1'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.receiveBill(tenant.user_id)
                Swal.fire({
                    title: 'Payment confirmed',
                    icon: 'success',
                    timer:1000
                }).then(() => {
                    setPayment(true)
                })
            }
        })


        console.log('ekhane just update tenant query hobe. swal fire kore refresh')
    }
    return (
        // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        loading ? <CircularProgress /> :
            (

                <Card className={classes.card} raised elevation={6}>
                    <CardMedia
                        className={classes.media}
                        image={cardImage}
                    >
                    </CardMedia>
                    <CardContent className={classes.overlay2}>
                        {
                            payment ? (
                                <Typography variant='body2'>
                                    Bill paid
                                </Typography>
                            ) :
                                (
                                    <Grid style={{ display: 'block' }}>
                                        <Typography style={{ marginLeft: '6px' }} variant='body2'>
                                            Bill pending
                                        </Typography>
                                        <Button
                                            onClick={confirmPayment}
                                            style={{
                                                marginTop: '20px',
                                                borderRadius: '15px',
                                                color: 'green'
                                            }}>Confirm payment</Button>
                                    </Grid>

                                )
                        }
                    </CardContent>
                    <CardContent className={classes.overlay}>
                        <Typography gutterBottom variant='h5' component='div'>
                            {users[0].name}
                        </Typography>
                        <Typography variant='body2' >
                            Room #{tenant.room_number}
                        </Typography>
                        <Typography variant='body2' >
                            {users[0].phone}
                        </Typography>
                    </CardContent>
                </Card>

            )




        // </Box>

    )
}

export default TenantCard
