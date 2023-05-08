import React, { useState, useEffect } from 'react'
import HostelCard from '../../HostelCard/HosetlCard'
import {Button, Typography,TextField} from '@material-ui/core'
import {  CircularProgress,Rating, Grid,Paper } from '@mui/material';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { getTenantsByUserId } from '../../../actions/Tenants';
import { getHostelByHostelId } from '../../../actions/hostels';
import { createReview, getReviewsByUserAndHostel } from '../../../actions/Reviews';
import { createComplaint } from '../../../actions/Complaints';
import Swal from 'sweetalert2'
import DefaultMessage from '../../DefaultMessage/DefaultMessage';
import * as api from '../../../api/index'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';
function Hostel() {
  const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')))
  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = useState(5)
  
  const initialState = { comment: '', complaint: '' };
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate()

  // const {tenants, tenantsLoading} =  useSelector((state)=>state.tenants)
  // const {hostels, hostelsLoading} = useSelector((state)=> state.hostels)
  // const {reviews} = useSelector((state)=>state.reviews)
  const [tenants, setTenants] = useState([])
  const [hostels, setHostels] = useState([])
  const [reviews, setReviews] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [rentMessage, setRentMessage] = useState('')
  const fetchData = async () =>{

    
    const {data} = await api.getTenantsByUserId(user?.result?._id)
    setTenants([...tenants, data])
    if(data.assigned_room)
    {
      const newData = await api.getHostelByHostelId(data.hostel_id)
      setHostels([...hostels,newData.data])
      const newRoom = await api.getRoomsByRoomId(data.room_id)
      console.log(newRoom)
      setRooms([...rooms,newRoom.data])
      setRentMessage('Dear tenant. You have bill due ' + 'jsdhfjkds')
      const rev = await api.getReviewsByUserAndHostel(user?.result?._id, data.hostel_id)
      setReviews([...reviews,rev.data])
    }
    setLoading(false)

  }
  const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        }));
  useEffect(()=>{
    fetchData()
  },[])

    const sendReview = ()=> {
      console.log(reviews)
        const title_text = (reviews.length === 0 || !reviews[0]) ? 'Do you want to send this review': 'You have already reviewed this place. Update?'
        const confirm_text = (reviews.length === 0 || !reviews[0]) ? 'Send review' : 'Update review'
        Swal.fire({
        title: title_text,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: confirm_text,
        denyButtonText: `Edit`,
        confirmButtonColor:'#0C21C1'
      }).then(async (result) => {
        var date = new Date()
        const curState={
        user_name:user?.result?.name,
        user_id: user?.result?._id,
        hostel_id:tenants[0].hostel_id,
        stars:value,
        comments:form.comment,
        date_posted: date,
        }
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if(reviews.length === 0 || !reviews[0])
        {
          await api.createReview(curState)
            Swal.fire({title:'Review sent successfully',icon:'success',showConfirmButton:false, timer:1000} ).then(()=>{
            window.location.reload(false);
          })
          //fire something
        }
        else 
        {
          console.log(reviews[0]._id)
          await api.updateReview(reviews[0]._id,curState )
          Swal.fire({title:'Review Edited successfully',icon:'success',showConfirmButton:false,timer:1000} ).then(()=>{
            window.location.reload(false);
          })
          //here we update
        }
        
        
      }
      }
      )

    }

    const sendComplaint = () =>{
      var date = new Date()
      const curState={    
        tenant_id: user?.result?._id,
        tenant_name: user?.result?.name,
        description:form.complaint,
        hostel_id:tenants[0].hostel_id,
        hostel_name: tenants[0].hostel_name,
        room_number: tenants[0].room_number,
        room_id:tenants[0].room_id,
        date_raised:date,
      }
      Swal.fire({
        title: 'Do you want to send this complaint?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Send complaint',
        denyButtonText: `Edit`,
        confirmButtonColor:'#0C21C1'
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // dispatch(createComplaint(curState)).then(()=>{
          //   Swal.fire('Complaint submitted!', '', 'success')
          //   window.location.reload(false);
          // })
          await api.createComplaint(curState)
          Swal.fire({title:'Complaint submitted!', icon:'success', confirmButtonColor:'#0C21C1'}).then(()=>{
            window.location.reload(false);
          })
          
        } else if (result.isDenied) {
          Swal.fire({title:'Changes are not saved', icon:'info', confirmButtonColor:'#0C21C1'}).then(()=>{
            window.location.reload(false);
          })
        }
        
      })
      


    }
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const join =async () =>{
      if(!tenants[0].joined_meal_system)
      {
        await api.updateTenant(tenants[0]._id,{joined_meal_system:true})
        Swal.fire({
          title: 'Successfully joined mealSystem!',
          icon:'success',
          showConfirmButton:false,
          timer:1000
        }).then(()=>{
          navigate('/Mealsheet')
        })
      }
      else navigate('/Mealsheet')
    }
    const cancel = () =>{
      Swal.fire({
        title: 'Are you sure you want to cancel your booking?',
        showCancelButton: true,
        confirmButtonText: 'Cancel booking',
        confirmButtonColor:'#0C21C1'
      }).then(async (result) => {
        if(result.isConfirmed)
        {
          await api.updateTenant(tenants[0]._id,{has_booked:false})
          const {data} = await api.getRoomRequestsByUserId(user?.result?._id)
          console.log(data)
          await api.deleteRoomRequest(data[0]._id)
          Swal.fire({
            title:'Cancelled booking!',
            icon:'success',
            timer:1000,
            showConfirmButton:false
          }).then(()=>{
            navigate('/Homepage')
          })
        }
      })

    }
  return (
    
    loading?<CircularProgress/>:
    (
      hostels.length !==0 ?(
      <form>
      
        <Grid container spacing={4}>
          <Grid item xs={8} >
            {/* <Item>Hostel card</Item> */}
            {
              !tenants[0].bill_paid?<DefaultMessage color='error' message={`Dear tenant. You have bill pending for this month. Please pay ${rooms[0].rent} Bdt`} />:<div></div>
            
            }
            <HostelCard currentUser={user} currentHostel={hostels} currentTenant={tenants} />
          </Grid>
          <Grid item xs={4}>
          {/* <Item>Complaint part</Item> */}
            <Button onClick={join} variant='contained' className={classes.cardActions}>
              Join meal system
            </Button>
            <Typography className={classes.crow2}>
              Any complaints ?
            </Typography>
            <TextField
              onChange={handleChange}
              multiline
              minRows={3}
              variant='outlined'
              label='Your Message'
              name='complaint'
              className={classes.complaint}
              type='text'
            >

            </TextField>
            <Button variant='contained' onClick={sendComplaint} className={classes.cardAction2}>
              Send
            </Button>

          </Grid>
          <Grid item xs={4} style={{ display: 'block' }} >
            {/* <Item> Rating place</Item> */}
            <Rating

              className={classes.rating}
              precision={0.5}
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Typography className={classes.crow}>
              Leave a detailed review
            </Typography>
            <TextField
              onChange={handleChange}
              multiline
              minRows={3}
              variant='outlined'
              label='Your Message'
              name='comment'
              className={classes.textField}
              type='text'
            >

            </TextField>
            <Button variant='contained' onClick={sendReview} className={classes.cardAction}>
              Send
            </Button>


          </Grid>

      </Grid>
      </form>
      ):
      (
        !tenants[0].has_booked?
        <DefaultMessage message='You are not part of any hostel right now'/>:
        (
          <Grid display='flex'>
            <DefaultMessage message='You have a booking pending right now. Do you want to cancel?'/>
            <Button
              onClick={cancel}
              style={{
                color:'white',
                backgroundColor:'#0C21C1',
                height:'40px',
                marginLeft:'20px',
                marginTop:'10px'
              }}
            >Cancel</Button>
          </Grid>
        
        )
      )
    )
    
  )
}

export default Hostel
