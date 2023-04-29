import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid, CircularProgress } from '@material-ui/core';
import RoomCard from '../../RoomCard/RoomCard';
import Rooms from '../../Rooms/Rooms.js'
import { getTenantsByUserId } from '../../../actions/Tenants';
import { getEmptyRooms } from '../../../actions/Rooms';
//This will have a population of all the room cards 
function Homepage({ setCurrentId }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  useEffect(()=>{
      console.log('hogu ni')
      console.log(user?.result?._id)
      dispatch(getEmptyRooms())
      dispatch(getTenantsByUserId(user?.result?._id))
    },[])
    
  return (
    
      <Rooms/>
  )
}

export default Homepage
