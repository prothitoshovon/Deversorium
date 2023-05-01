import React from 'react';
import { Grid, CircularProgress,Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import RoomRequestCard from '../RoomRequestCard/RoomRequestCard';

const RoomRequestList = ({ setCurrentId }) => {
  const { roomRequests, isLoading } = useSelector((state) => state.roomRequests);

  if (!roomRequests && !isLoading) return 'No requests pending';

  return (
    isLoading ? <CircularProgress /> : (
      roomRequests.length===0?(<Typography gutterBottom variant='h5'>You do not have any room requests right now</Typography>):(
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