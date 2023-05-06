import React, {useEffect, useState} from 'react';
import { Grid, CircularProgress,Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import RoomRequestCard from '../RoomRequestCard/RoomRequestCard';
import DefaultMessage from '../DefaultMessage/DefaultMessage';
import { getHostelByOwnerId } from '../../actions/hostels';
import { getRoomRequestsByHostelId } from '../../actions/RoomRequests';

const RoomRequestList = ({ setCurrentId, hostels, roomRequests }) => {
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')))
 
  return (

        hostels.length !== 0 ?(
              roomRequests.length===0?(<DefaultMessage message="No room requests"/>):(
              <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
                {roomRequests?.map((roomRequest) => (
                  <Grid key={roomRequest._id} item xs={12} sm={12} md={6} lg={3}>
                    <RoomRequestCard roomRequest={roomRequest}  />
                  </Grid>
                ))}
              </Grid>
            )     
        ):
        (
          <DefaultMessage message='You do not have a hostel right now. Go to hostel page to make one'/>
        )   
    
  );
};

export default RoomRequestList;