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
import { getComplaintsByHostel } from '../../../actions/Complaints';
import DefaultMessage from '../../DefaultMessage/DefaultMessage';
function Homepage({ setCurrentId }) {

  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  
  const dispatch = useDispatch();
  const { hostelsLoading, hostels } = useSelector((state) => state.hostels);
  
  
  useEffect(()=>{
    
    dispatch(getHostelByOwnerId(user?.result?._id))

    
  },[])
  useEffect(()=>{
    if(!hostels)
        {
            console.log('hehehe')
            console.log(user?.result?._id)
            dispatch(getHostelByOwnerId(user?.result?._id))
        }
        else if(hostels)
        {
            console.log('srsly')
            dispatch(getRoomRequestsByHostelId(hostels._id))
            //dispatch(getReviewsByHostel(hostels._id))
        }
  },[hostels])
  return (
    <div>
    {
      hostelsLoading? <CircularProgress/>:(
          
          hostels.length === 0? <DefaultMessage message='You do not have a hostel right now. Go to hostel pageto make one'/>:<RoomRequestList/>    
      )
    }
    </div>
    
  )
}

export default Homepage
