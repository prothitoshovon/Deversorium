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
import RoomRequestList from '../../RoomRequests/RoomRequestList'; 
function Homepage({ setCurrentId, user }) {

  const dispatch = useDispatch();
  const { hostels } = useSelector((state) => state.hostels);
  //const {isLoading,roomRequests} = useSelector((state) => state.roomRequests)
  useEffect(()=>{
    console.log(hostels)
        if(hostels === null || hostels.length === 0)dispatch(getHostelByOwnerId(user?.result?._id))        
        if(hostels !== null )
        {
          console.log(hostels._id)
          dispatch(getRoomRequestsByHostelId(hostels._id))    
        } 
    },[hostels])

  return (
    <div>
    <>
    {
      hostels === null || hostels.length === 0 ?(<h1 style={{fontFamily:'sans-serif'}}> You do not have a hostel right now</h1>):
    (
  
    
      <RoomRequestList />
      // <Grid container alignItems="stretch" spacing={2} style={{display:'block'}}>
      //   {
      //     roomRequests===null || roomRequests.length === 0 ?(
      //         <Grid  style={{marginLeft:'15px'}}>
      //         <h2>No Requests pending</h2>
      //         </Grid>
      //     ):
      //     (
      //       roomRequests?.map((roomRequest) => (
      //       <Grid key={roomRequest._id} >
      //         <RoomRequestCard roomRequest={roomRequest} hostel={hostels} setCurrentId={setCurrentId}/>
      //       </Grid>
      //       ))
      //     )
        
        
      //   }
      // </Grid>
    )
    
  }
    </>

    
    </div>
    
  )
}

export default Homepage
