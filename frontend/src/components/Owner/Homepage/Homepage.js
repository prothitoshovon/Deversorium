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
function Homepage({ setCurrentId }) {

  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  //console.log(user?.result.name)
  const dispatch = useDispatch();
  const { isLoading, hostels } = useSelector((state) => state.hostels);
  //const {isLoading,roomRequests} = useSelector((state) => state.roomRequests)
  //console.log('owner homepage rendered')
  useEffect(()=>{
        console.log('owner homepage useEffect')
        dispatch(getHostelByOwnerId(user?.result?._id))        
        if(hostels !== null )
        {
          console.log('TEST')
          console.log(hostels)
          dispatch(getRoomRequestsByHostelId(hostels._id))    
        } 
    },[])

  return (
    <div>
    {
      isLoading? <CircularProgress/>:(
        
          !hostels ||hostels.length === 0? <h2>You do not have any hostels right now, go to hostel page to make one</h2>:<RoomRequestList/>    
      )
    }
    </div>
    
  )
}

export default Homepage
