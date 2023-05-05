import React, { useState,useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from '../../ReviewCard/ReviewCard'
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getReviewsByHostel } from '../../../actions/Reviews';
import DefaultMessage from '../../DefaultMessage/DefaultMessage';

const Reviews = ({ setCurrentId }) => {
    //Need Hostel by owner ID 
    //Need reviews by hostel ID
    
    const dispatch = useDispatch()
    const [user,setUser] =  useState(JSON.parse(localStorage.getItem('profile')))
    const { reviews, reviewsLoading } = useSelector((state) => state.reviews);
    
    const { hostels } = useSelector((state) => state.hostels);
    // useEffect(()=>{
    //   console.log(user,hostels, reviews)
    // },[])

    useEffect(()=>{
        // console.log('hono')
        // if(!hostels)console.log('no hostel')
        // else if(hostels.length === 0)
        // {
        //     console.log('get hostel by owner ID called')
        //     dispatch(getHostelByOwnerId(user?.result?._id))
        // }
        // else console.log(hostels)
        dispatch(getHostelByOwnerId(user?.result?._id))
    },[])
    useEffect(()=>{
        if(hostels.length !== 0 && reviews.length === 0)
        {
            console.log('srsly')
            dispatch(getReviewsByHostel(hostels._id))
            //dispatch(getReviewsByHostel(hostels._id))
        }
    },[hostels])
    if(!hostels)return 'You do not have a hostel right now'
    //if (!reviews.length && !isLoading) return 'No reviews yet';

  return (
    reviewsLoading || hostels.length===0 ? <CircularProgress /> : (
      reviews.length === 0 ? <DefaultMessage message='No reviews yet' />:
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
        <Grid  item xs={12} sm={12} md={6} lg={3}>
          <DefaultMessage message='Your reviews'/>
        </Grid>
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