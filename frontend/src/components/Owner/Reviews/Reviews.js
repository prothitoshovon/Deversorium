import React, { useState,useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from '../../ReviewCard/ReviewCard'
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getReviewsByHostel } from '../../../actions/Reviews';

const Reviews = ({ setCurrentId }) => {
    //Need Hostel by owner ID 
    //Need reviews by hostel ID
    
    const dispatch = useDispatch()
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')))
    const { reviews, isLoading } = useSelector((state) => state.reviews);
    
    const { hostels } = useSelector((state) => state.hostels);
    useEffect(()=>{
        if(!hostels)console.log('no hostel')
        else if(hostels.length === 0)dispatch(getHostelByOwnerId(user?.result?._id))
    },[hostels])
    useEffect(()=>{
        console.log(hostels)
        if(hostels)
        {
            if(!reviews)console.log('No reviews ever')
            else dispatch(getReviewsByHostel(hostels._id))
        }
    },[])
    if(!hostels)return 'You do not have a hostel right now'
    if (!reviews.length && !isLoading) return 'No reviews yet';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
        {reviews?.map((review) => (
          <Grid key={review._id} item xs={12} sm={12} md={6} lg={3}>
            <ReviewCard review={review}/>
            {/* <RoomRequestCard roomRequest={roomRequest}  /> */}
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Reviews;