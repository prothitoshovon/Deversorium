import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { Grid, TextField, Button, Card, CardContent, Typography,CircularProgress } from '@material-ui/core';
import RoomRequestList from '../../RoomRequests/RoomRequestList'; 
import * as api from '../../../api/index'
function Homepage({ setCurrentId }) {

  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  const [flag, setFlag] = useState(false)
  const dispatch = useDispatch();
  // const { hostelsLoading, hostels } = useSelector((state) => state.hostels);
  // const {roomRequests, roomRequestsLoading} = useSelector((state) => state.roomRequests)
  const [hostels, setHostels] = useState([])
  const [roomRequests, setRoomRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    const {data} = await api.getHostelByOwnerId(user?.result?._id)
    setHostels([...hostels, data])
    const newData = await api.getRoomRequestsByHostelId(data._id)
    setRoomRequests(newData.data)
    setLoading(false)
  }
  useEffect(()=> {
    fetchData()
   
  },[])
 
  return (
    <div>
    {
      loading? <CircularProgress/>:
      <RoomRequestList hostels={hostels} roomRequests={roomRequests}/>    
    }
    </div>
    
  )
}

export default Homepage
