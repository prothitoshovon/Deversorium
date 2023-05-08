import React,{useEffect, useState} from 'react'
import { Box,Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from '@material-ui/core/';
import Rating from '@mui/material/Rating';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoomRequest } from '../../actions/RoomRequests';
import image from '../../images/searching.png'
import useStyles from './styles.js'
import { getHostelByHostelId } from '../../actions/hostels';
import { getTenantsByUserId } from '../../actions/Tenants';
import { createSelector } from 'reselect';
import Swal from 'sweetalert2'
import * as api from '../../api/index'
function RoomCard({ room,setCurrentId }) {

   
    const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = user?.result?._id;
    const classes = useStyles();
    const [tenants, setTenants] = useState([])
    const [loading, setLoading] = useState(true)
    const [hostels, setHostels] = useState([])
    //Massive refactoring opportunity is to add an attribute to hostels, called review with  stars at first 
    const [reviews, setReviews] = useState([])
    const [stars, setStars] = useState(-1.0)
    const [hasBooked, setHasBooked] = useState(false)
    const fetchData = async () =>{

        try {
            const {data} = await api.getTenantsByUserId(user?.result?._id)
            setTenants([...tenants, data])
            const newData = await api.getHostelByHostelId(room.hostel_id)
            setHostels([...hostels,newData.data])
            const revs = await api.getReviewsByHostel(room.hostel_id)
            const booking = await api.getRoomRequestsByUserId(user?.result?._id)
            if(booking.data.length === 0 || booking.data[0].user_id !==user?.result?._id)setHasBooked(false)
            else setHasBooked(true)
            console.log(booking.data)
            if(revs.data.length)
            {
                let sum = 0;
                for(let i=0;i<revs.data.length;i++)
                {
                    sum += revs.data[i].stars
                }
                setStars(sum/revs.data.length)
            }
            setLoading(false)
            
        } catch (error) {
            setLoading(false)
        }
        
    }
    useEffect(()=>{
        fetchData()
    },[])
    
    const book = ()=>{

        //Use getTenant by userID 
        var date = new Date()
        const curForm = {
        user_id:userId,
        user_name:user?.result?.name,
        user_phone:user?.result?.phone,
        room_id:room._id,
        room_number: room.room_number,
        hostel_id:room.hostel_id,
        hostel_name:'',
        date_issued: date
        }
        console.log(tenants)
        if(tenants[0].has_booked === true)
        {
            Swal.fire(
                {
                    title:'You already have a  booking, go to hostel page to cancel',
                    confirmButtonColor:'#0C21C1'

                })
        }
        else
        {
            //const confirm  = prompt('You can only book one room at a time.Type confirm and ok to Continue?','confirm')
            
            Swal.fire({
                title: 'Confirm booking? You can\'t book other rooms after this',
                showCancelButton: true,
                confirmButtonText: 'Save',
                confirmButtonColor:'#0C21C1'
                }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    await api.createRoomRequest(curForm)
                    Swal.fire({
                        title:'Booking Complete!',
                        icon:'success',
                        confirmButtonColor:'#0C21C1'
                    } ).then(()=>{
                        window.location.reload(false)
                    })
                    // dispatch(createRoomRequest(curForm)).then(()=>{
                    //     Swal.fire('Booking complete!', '', 'success' , )
                        
                    // })
                    
                }
            })
            
        }
    }
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date =new Date( room.next_vacancy_date)
  return (
            loading?<CircularProgress/>:
                (
                <Card raised elevation={6} className={classes.card}>
                  <CardMedia
                      className={classes.media}
                      image={image}
                  >

                  </CardMedia>
                  <CardContent className={classes.overlay}>
                      <Typography gutterBottom variant='h6' component='div'>
                          {room.hostel_name}
                      </Typography>
                      <Typography  variant='body2' >
                          Address: {room.hostel_address} 
                      </Typography>
                      <Typography variant='body2' >
                          Rent: {room.rent} BDT
                      </Typography>
                      <Typography variant='body2' >
                          Area: {room.area} sqft
                      </Typography>
                  </CardContent>
                  <CardContent className={classes.overlay2}>
                    <Typography variant='body2'>
                        Free from {monthNames[date.getMonth()]} {date.getFullYear()}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                        {
                            stars===-1?<Typography>No reviews yet</Typography>:
                            <Rating size='small' name="half-rating-read" defaultValue={stars} precision={0.001} readOnly />
                            
                        }
                        {
                            hasBooked?<Button disabled size='small' style={{color:'#0C21C1'}}>Booked</Button>:
                            <Button size='small' onClick={book} style={{color:'#0C21C1'}}>Book now</Button>
                        }
                        
                  </CardActions>
              </Card>
            )
              
          

    
  )
}

export default RoomCard
