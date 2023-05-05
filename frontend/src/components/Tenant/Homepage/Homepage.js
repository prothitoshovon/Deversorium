import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid, CircularProgress } from '@material-ui/core';
import RoomCard from '../../RoomCard/RoomCard';
import Rooms from '../../Rooms/Rooms.js'
import { getTenantsByUserId } from '../../../actions/Tenants';
import { getEmptyRooms } from '../../../actions/Rooms';
import * as api from '../../../api/index'
//This will have a population of all the room cards 
function Homepage({ setCurrentId }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchData = async () =>{
    const newData = await api.getEmptyRooms()
    setRooms(newData.data)
    console.log(newData.data)
    setLoading(false)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
      loading?<CircularProgress/>:
      <Rooms rooms={rooms}/>
  )
}

export default Homepage
