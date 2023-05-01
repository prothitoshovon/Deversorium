import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import RoomRequestCard from '../RoomRequestCard/RoomRequestCard';
import ComplaintCard from '../ComplaintCard/ComplaintCard';

const ComplainCardList = ({ setCurrentId }) => {
  const { complaints, isLoading } = useSelector((state) => state.complaints);

  if (!complaints.length && !isLoading) return 'No Complaints';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
        {complaints?.map((complaint) => (
          <Grid key={complaint._id} item xs={12} sm={12} md={6} lg={3}>
            {/* <RoomRequestCard roomRequest={roomRequest}  /> */}
            <ComplaintCard complaint={complaint} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default ComplainCardList;