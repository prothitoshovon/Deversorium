import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEmptyRooms } from '../../../actions/Rooms';
import { Grid, CircularProgress } from '@material-ui/core';
import RoomCard from '../../RoomCard/RoomCard';
//This will have a population of all the room cards 
function Homepage() {

  const dispatch = useDispatch();
  const {rooms,isLoading} = useSelector((state)=>state.rooms)
  
  useEffect(()=>{
      //Dispatch so that rooms are populated 
      dispatch(getEmptyRooms())
    },[])

    if (!rooms.length && !isLoading) return 'No rooms!';
    
  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {rooms?.map((room) => (
          <Grid key={room._id} item xs={12} sm={12} md={6} lg={3}>
            <RoomCard />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Homepage
