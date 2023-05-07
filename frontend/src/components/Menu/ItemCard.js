import React, { useState, useEffect } from 'react'
import { Button, Grid, Box, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase, CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cardImage from '../../images/Food.png'
import useStyles from './styles.js'
import * as api from '../../api/index'
import Swal from 'sweetalert2'
function ItemCard({ item, tenants, setCurrentId }) {

    //const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    console.log(item)
    return (
        // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>

        <Card className={classes.card} raised elevation={6}>
            <CardMedia
                className={classes.media}
                image={cardImage}
            >
            </CardMedia>
            
            <CardContent className={classes.overlay}>
                <Typography gutterBottom variant='h5' component='div'>
                   {item.name} For Dinner and Lunch
                </Typography>
                <Typography variant='body2' >

                    Sides: Rice, Lentils, Sides
                </Typography>
                <Typography variant='body2' >
                    Price per serving: {item.unit_price} bdt
                </Typography>
            </CardContent>
        </Card>
        // </Box>

    )
}

export default ItemCard
