import React, { useState, useEffect } from 'react'
import HostelCard from '../../HostelCard/HosetlCard'
import {Button, Typography,TextField} from '@material-ui/core'
import {  CircularProgress,Rating, Grid } from '@mui/material';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { getTenantsByUserId } from '../../../actions/Tenants';
import { getHostelByHostelId } from '../../../actions/hostels';
import { createReview, getReviewsByUserAndHostel } from '../../../actions/Reviews';
import { createComplaint } from '../../../actions/Complaints';
//TODO Fetch the tenant from its user ID 
//If the tenant has a room assigned then we will display Hostel card 
//If the tenant does not have  a room assigned, then we will display You are not part of any hostel 
//If tenant has requested and not assigned, then owner has not approved your request. cancel ?

function Hostel() {
  const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')))
  const [flag, setFlag] = useState(true)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = useState(5)
  const {tenants} =  useSelector((state)=>state.tenants)
  const {hostels} = useSelector((state)=> state.hostels)
  const {reviews} = useSelector((state)=>state.reviews)
  const initialState = { comment: '', complaint: '' };
  const [form, setForm] = useState(initialState);
  console.log('gu ekhon kene render or')
  useEffect(()=>{
      
      if(hostels.length === 0)dispatch(getHostelByHostelId(tenants.hostel_id))
      if(reviews===null&& hostels.length !== 0 && flag ===true)
      {
        dispatch(getReviewsByUserAndHostel(user?.result?._id,tenants.hostel_id))
        setFlag(false)
      }
    },[tenants, hostels])
    //dispatch(getHostelByHostelId(tenants.hostel_id))
    //dispatch(getReviewsByUserAndHostel(user?.result?._id,tenants.hostel_id))
    const sendReview = ()=> {
      var date = new Date()
      const curState={

      user_name:user?.result?.name,
      user_id: user?.result?._id,
      hostel_id:tenants.hostel_id,
      stars:value,
      comments:form.comment,
      date_posted: date,
      }
      dispatch(getReviewsByUserAndHostel(user?.result?._id,tenants.hostel_id)).then(()=>
      {
        console.log(reviews)
        if(!reviews || reviews.length === 0 )dispatch(createReview(curState))
        else 
        {
          const confirm  = prompt('You already reviewd this place. You cannot review it again','confirm')
          
        }
      })
      

    }

    const sendComplaint = () =>{
      var date = new Date()
      const curState={    
        tenant_id: user?.result?._id,
        tenant_name: user?.result?.name,
        description:form.complaint,
        hostel_id:tenants.hostel_id,
        hostel_name: tenants.hostel_name,
        room_number: tenants.room_number,
        room_id:tenants.room_id,
        date_raised:date,
      }
      // tenant_id: {type: String, required: true},
      // tenant_name: String,
      // description: {type: String, required: true},
      // room_id: {type: String, required: true},
      // room_number: {type: String, required: true},
      // hostel_id: {type: String, required: true},
      // hostel_name: String,
      // date_raised: {
      //     type: Date,
      //     default: new Date()
      // }
      console.log(curState)
      dispatch(createComplaint(curState))


    }
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    tenants.hostel_id !== "Unassigned" ?(
      <form>
      
      <Grid container spacing={2}>
        <Grid item xs={8} >
          <HostelCard currentUser={user} currentHostel={hostels} currentTenant={tenants} />
        </Grid>
        <Grid item xs={4}>
          <Button variant='contained' className={classes.cardActions}>
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
        <Grid item xs={8} style={{ display: 'block' }} >

          <Rating

            className={classes.rating}
            precision={0.5}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />


        </Grid>

        <Grid item xs={8}>
        
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
      <h1> You are not part of any hostel at this moment</h1>
    )
    
  )
}

export default Hostel
