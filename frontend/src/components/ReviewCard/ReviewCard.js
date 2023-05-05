import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import { Button, CircularProgress, Grid, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoomRequest } from '../../actions/RoomRequests';
import image from '../../images/Avatar.png'
import quote from '../../images/quote.png'
import useStyles from './styles.js'
import { getHostelByHostelId } from '../../actions/hostels';
import { getTenantsByUserId } from '../../actions/Tenants';
function ReviewCard({  review,setCurrentId }) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();
  
    return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={image}
                >
                </CardMedia>

                <Typography variant='body2' className={classes.quote}>“ </Typography>
                <CardContent className={classes.overlay2}>
             
                    <Typography variant='body2' color='textSecondary' >
                        {review.comments}
                    </Typography>
                    <Typography gutterBottom variant='h4' >
                        {review.user_name}
                    </Typography>
                    <Rating
                    precision={.5}
                    value={review.stars}
                    readOnly
                    >
                    </Rating>
                </CardContent>
            </Card>

    )
}

//{/* <Grid item xs={4}>
//    <Button variant='contained'className={classes.cardActions}>
//  Join meal system
// </Button>
// </Grid> */}
export default ReviewCard
