import React, { useState, useEffect } from 'react'
import HostelCard from '../../HostelCard/HosetlCard'
import {Button, Typography,TextField} from '@material-ui/core'
import {  CircularProgress,Rating, Grid } from '@mui/material';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { getTenantsByUserId } from '../../../actions/Tenants';
import { getHostelByHostelId } from '../../../actions/hostels';
import { createReview } from '../../../actions/Reviews';
//TODO Fetch the tenant from its user ID 
//If the tenant has a room assigned then we will display Hostel card 
//If the tenant does not have  a room assigned, then we will display You are not part of any hostel 
//If tenant has requested and not assigned, then owner has not approved your request. cancel ?

function Hostel() {
  const [user,setUser] = useState( JSON.parse(localStorage.getItem('profile')))
  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = useState(5)
  const {tenants} =  useSelector((state)=>state.tenants)
  const {hostels} = useSelector((state)=> state.hostels)
  const initialState = { comment: '', complaint: '' };
  const [form, setForm] = useState(initialState);
  useEffect(()=>{
      //Dispatch  so we get hostel related to the tenant
      if(tenants.length === 0)
      {
        console.log('dakse')
        dispatch(getTenantsByUserId(user?.result?._id))
      }
      else if(hostels.length === 0)dispatch(getHostelByHostelId(tenants[0].hostel_id))
    },[])

    const sendReview = ()=>{
      // user_id: {type: String, required: true},
      // hostel_id: {type: String, required: true},
      // comments: {type: String, required: true},
      // date_posted: 
      // {
      //     type: Date,
      //     default: new Date()
      // },
      // stars: {type: Number, required: true}
      var date = new Date()
      const curState={

      
      user_id: user?.result?._id,
      hostel_id:tenants[0].hostel_id,
      stars:value,
      comments:form.comment,
      date_posted: date,


      }

      dispatch(createReview(curState))

    }
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    tenants.length !== 0 ?(
      <form>
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
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
          <Button variant='contained' className={classes.cardAction2}>
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
