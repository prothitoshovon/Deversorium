import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEmptyRooms } from '../../../actions/Rooms';
import { Grid, CircularProgress } from '@material-ui/core';
import RoomCard from '../../RoomCard/RoomCard';
import Rooms from '../../Rooms/Rooms.js'
import { getTenantsByUserId } from '../../../actions/Tenants';
import { getHostelByOwnerId, getHostels } from '../../../actions/hostels';
//This will have a population of all the room cards 
function Homepage({ setCurrentId, user }) {

  const dispatch = useDispatch();
  useEffect(()=>{
      //Dispatch so that rooms are populated 
      
      dispatch(getEmptyRooms())
      dispatch(getTenantsByUserId(user?.result?._id))
    },[])
    
  
  return (
    // rooms === null ? <CircularProgress /> : (
    //   <Grid container alignItems="stretch" spacing={2} style={{display:'block'}}>
    //     {rooms?.map((room) => (
    //       <Grid key={room._id} >
    //         <RoomCard room={room} />
    //       </Grid>
    //     ))}
    //   </Grid>
    // )
    <Rooms/>
  )
}

export default Homepage
