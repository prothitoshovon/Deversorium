import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ReviewCard from '../ReviewCard/ReviewCard';

const Reviews = ({ setCurrentId }) => {
  const { reviews, isLoading } = useSelector((state) => state.reviews);

  if (!reviews.length && !isLoading) return 'No requests pending';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
        {reviews?.map((review) => (
          <Grid key={roomRequest._id} item xs={12} sm={12} md={6} lg={3}>
            <ReviewCard review={review}/>
            {/* <RoomRequestCard roomRequest={roomRequest}  /> */}
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Reviews;