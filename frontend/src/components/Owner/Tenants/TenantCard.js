import React, { useEffect } from 'react'
import { Grid,Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase, CircularProgress } from '@material-ui/core/';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cardImage from '../../../images/Order Placed.png'
import useStyles from './styles.js'
import { getuserbyuserid } from '../../../actions/Users';

function TenantCard({ tenant, setCurrentId }) {

    //const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const {users, isLoading} =  useSelector((state) => state.users)
    useEffect(()=>{
        console.log(tenant.user_id)
        if(!users)dispatch(getuserbyuserid(tenant.user_id))
            
    },[])
    useEffect(()=>{
        if(!users)console.log('aisena')
        else console.log('aicche')
    },[users])

    
  return (
    // <Box width='600px' style={{marginTop:"20px", marginLeft:"10px"}}>
        isLoading?<CircularProgress/>:
        (

                    <Card className={classes.card}raised elevation={6}>
                    <CardMedia
                        className={classes.media}
                        image={cardImage}
                    >
                    </CardMedia>
                    <CardContent className={classes.overlay}>
                        <Typography gutterBottom variant='h5' component='div'>
                        {users.name}
                        </Typography>
                        <Typography variant='body2' >
                        {tenant.room_number}
                        </Typography>
                        <Typography variant='body2' >
                        {users.phone}
                        </Typography>
                    </CardContent>
                </Card>
                
        )

            
        
        
    // </Box>
    
  )
}

export default TenantCard
