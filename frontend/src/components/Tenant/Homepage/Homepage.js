import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getEmptyRooms } from '../../../actions/Rooms';
import { Grid, CircularProgress } from '@material-ui/core';
import RoomCard from '../../RoomCard/RoomCard';
//This will have a population of all the room cards 
function Homepage({ setCurrentId }) {

  const dispatch = useDispatch();
  const {rooms,isLoading} = useSelector((state)=>state.rooms)
  
  useEffect(()=>{
      //Dispatch so that rooms are populated 
      dispatch(getEmptyRooms())
    },[])
    if (!rooms.length && !isLoading) return 'No rooms!';
    
  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={2}>
        {rooms?.map((room) => (
          <Grid key={room._id} >
            <RoomCard room={room} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Homepage
