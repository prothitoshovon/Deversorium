import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import RoomRequestCard from '../RoomRequestCard/RoomRequestCard';

const RoomRequestList = ({ setCurrentId }) => {
  const { roomRequests, isLoading } = useSelector((state) => state.roomRequests);

  if (!roomRequests.length && !isLoading) return 'No requests pending';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
        {roomRequests?.map((roomRequest) => (
          <Grid key={roomRequest._id} item xs={12} sm={12} md={6} lg={3}>
            <RoomRequestCard roomRequest={roomRequest}  />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default RoomRequestList;