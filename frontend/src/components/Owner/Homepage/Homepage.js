import React, {useEffect, useState} from 'react'
import {Route, Routes} from "react-router"
import { useDispatch, useSelector  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HostelForm from '../HostelForm/HostelForm'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Grid, TextField, Button, Card, CardContent, Typography,CircularProgress } from '@material-ui/core';
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getRoomRequestsByHostelId } from '../../../actions/RoomRequests';
import RoomRequestCard from '../../RoomRequestCard/RoomRequestCard';
function Homepage({ setCurrentId }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const { hostels } = useSelector((state) => state.hostels);
  const {isLoading,roomRequests} = useSelector((state) => state.roomRequests)
  useEffect(()=>{
        //Here will be a query to get all room requests that match his hostel ID 
        
        if(hostels.length == 0)dispatch(getHostelByOwnerId(user?.result?._id))        
        else dispatch(getRoomRequestsByHostelId(hostels._id))     
    },[hostels])
  const test = ()=>{
    console.log(roomRequests)
  }
  
  return (
    <div>
    <Link to="/HostelForm">
    <Button variant="contained" startIcon={<AddIcon/>} >Create your hostel
    </Button>
    </Link>
    <>
    {
      hostels.length == 0 ? (<h1> No hostels to show</h1>):
    (
  
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={2}>
        {roomRequests?.map((roomRequest) => (
          <Grid key={roomRequest._id} >
            <RoomRequestCard roomRequest={roomRequest} setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
    )
  }
    </>
    </div>
    
  )
}

export default Homepage
