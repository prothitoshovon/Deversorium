import React, {useEffect, useState} from 'react';
import { Grid, CircularProgress,Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import RoomRequestCard from '../RoomRequestCard/RoomRequestCard';
import DefaultMessage from '../DefaultMessage/DefaultMessage';
import { getHostelByOwnerId } from '../../actions/hostels';
import { getRoomRequestsByHostelId } from '../../actions/RoomRequests';

const RoomRequestList = ({ setCurrentId }) => {
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')))
  const { roomRequests, roomRequestsLoading } = useSelector((state) => state.roomRequests);
  const { hostels } = useSelector((state) => state.hostels);
  const dispatch = useDispatch()

    useEffect(()=>{
        console.log('hono')
        if(!hostels)console.log('no hostel')
        else if(hostels.length === 0)
        {
            console.log('get hostel by owner ID called')
            dispatch(getHostelByOwnerId(user?.result?._id))
        }
        else console.log(hostels)
    },[hostels])
    useEffect(()=>{
        console.log('aichhi')
        if(hostels.length !== 0)
        {
            if(!roomRequests)console.log('No rooms ever')
            else if(roomRequests.length===0)
            {
                dispatch(getRoomRequestsByHostelId(hostels._id))
            }
            else console.log(roomRequests)
        }
    },[])
  if(!hostels)return 'No hostel'
  return (
    roomRequestsLoading ? <CircularProgress /> : (
      roomRequests.length===0?(<DefaultMessage message="No room requests"/>):(
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
        {roomRequests?.map((roomRequest) => (
          <Grid key={roomRequest._id} item xs={12} sm={12} md={6} lg={3}>
            <RoomRequestCard roomRequest={roomRequest}  />
          </Grid>
        ))}
      </Grid>
      )
    )
  );
};

export default RoomRequestList;