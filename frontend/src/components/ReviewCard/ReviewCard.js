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

    // const {hostels} = useSelector((state) => state.hostels)
    // const {tenants} = useSelector((state) => state.tenants)
    useEffect(() => {

        //Query to find the hostel associated with room.hostel_id 
        //
        // console.log('rapid fire')
        // setUser(JSON.parse(localStorage.getItem('profile')))
        // if(tenants.length===0)dispatch(getTenantsByUserId(user?.result?._id))
        // if(hostels.length===0)dispatch(getHostelByHostelId(room.hostel_id))


    }, [])


    const book = () => {

    }
    return (
        // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>

        true === false ? (<CircularProgress />) :
            (

                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={image}
                    >

                    </CardMedia>
                    {/* <CardMedia className={classes.quote} image={quote}>
                    
                    </CardMedia> */}
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


        //</Box>

    )
}

//{/* <Grid item xs={4}>
//    <Button variant='contained'className={classes.cardActions}>
//  Join meal system
// </Button>
// </Grid> */}
export default ReviewCard
