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
import Swal from 'sweetalert2'

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
      if(tenants.length === 0)dispatch(getTenantsByUserId(user?.result?._id))
      if(hostels.length === 0)dispatch(getHostelByHostelId(tenants.hostel_id))
      if(tenants && flag)
      {
        dispatch(getReviewsByUserAndHostel(user?.result?._id,tenants.hostel_id))
        //dispatch(getReviewsByUserAndHostel(user?.result?._id,tenants.hostel_id))
        setFlag(false)
      }
    },[tenants, hostels])
    
    //dispatch(getHostelByHostelId(tenants.hostel_id))
    //dispatch(getReviewsByUserAndHostel(user?.result?._id,tenants.hostel_id))
    const sendReview = ()=> {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Send review',
        denyButtonText: `Edit`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
          var date = new Date()
          const curState={

          user_name:user?.result?.name,
          user_id: user?.result?._id,
          hostel_id:tenants.hostel_id,
          stars:value,
          comments:form.comment,
          date_posted: date,
          }
          console.log(reviews)
            if(!reviews || reviews.length === 0 )dispatch(createReview(curState))
            else 
            {
              Swal.fire({
                  title: 'Error!',
                  text: 'Do you want to continue',
                  icon: 'error',
                  confirmButtonText: 'Cool'
                })
                Swal.fire('You have already reviewed this place')
              //const confirm  = prompt('You already reviewd this place. You cannot review it again','confirm')
              
            }
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
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
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Send review',
        denyButtonText: `Edit`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(createComplaint(curState)).then(()=>{
            Swal.fire('Saved!', '', 'success')
          })
          
          
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
      


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
      <Typography style={{marginLeft:'10px'}}gutterBottom variant='h5'>
        You are not part of any hostels right now
      </Typography>
    )
    
  )
}

export default Hostel
