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
  useEffect(()=>{
      //Dispatch  so we get hostel related to the tenant
      console.log('fire')
      if(tenants.length === 0)
      {
        console.log('dakse')
        dispatch(getTenantsByUserId(user?.result?._id))
      }
      else if(hostels.length === 0)dispatch(getHostelByHostelId(tenants[0].hostel_id))
      if(reviews===null&& hostels.length !== 0 && flag ===true)
      {
        dispatch(getReviewsByUserAndHostel(user?.result?._id,tenants[0].hostel_id))
        setFlag(false)
      }
    },[])

    const sendReview = ()=> {
      var date = new Date()
      const curState={

      
      user_id: user?.result?._id,
      hostel_id:tenants[0].hostel_id,
      stars:value,
      comments:form.comment,
      date_posted: date,


      }
      if(!reviews)dispatch(createReview(curState))
      else 
      {
        const confirm  = prompt('You already reviewd this place. You cannot review it again','confirm')
        
      }

    }

    const sendComplaint = () =>{

      var date = new Date()
      const curState={

      
        user_id: user?.result?._id,
        description:form.complaint,
        hostel_id:tenants[0].hostel_id,
        room_id:tenants[0].room_id,
        date_raised:date,

      }
      // user_id: {type: String, required: true},
      // description: {type: String, required: true},
      // room_id: {type: String, required: true},
      // room_number: String,
      // hostel_id: {type: String, required: true},
      // hostel_name: String,
      // date_raised: {
      //     type: Date,
      //     default: new Date()
      // }
      dispatch(createComplaint(curState))


    }
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    tenants.length !== 0 ?(
      <form>
      
      <Grid container spacing={2}>
        <Grid item xs={8} >
          <HostelCard currentUser={user} currentHostel={hostels} currentTenant={tenants[0]} />
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
      <div>hehe</div>
    )
    
  )
}

export default Hostel
