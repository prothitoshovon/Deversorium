import React, { useState,useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from '../../ReviewCard/ReviewCard'
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getRoomsByHostelId } from '../../../actions/Rooms';
import RoomCard from './RoomCard';
import DefaultMessage from '../../DefaultMessage/DefaultMessage';

const Rooms = ({ setCurrentId }) => {
    //Need Hostel by owner ID 
    //Need reviews by hostel ID
    const dispatch = useDispatch()
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')))
    const { rooms, roomsLoading } = useSelector((state) => state.rooms);
    
    const { hostels,hostelsLoading } = useSelector((state) => state.hostels);
    useEffect(()=>{
        dispatch(getHostelByOwnerId(user?.result?._id))
    },[])
    useEffect(()=>{
        if(hostels.length !== 0 && rooms.length === 0)
        {
            console.log('srsly')
            dispatch(getRoomsByHostelId(hostels._id))
            //dispatch(getReviewsByHostel(hostels._id))
        }
    },[hostels])
    if(!hostels)return 'No hostel'
    //if (!rooms.length && !isLoading) return 'No rooms pending';

  return (
    roomsLoading ? <CircularProgress /> : (
        rooms.length ===0?(<DefaultMessage message='No rooms to show'/>):(
            <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
            <Grid  item xs={12} sm={12} md={6} lg={3}>
                <DefaultMessage message='Your rooms'/>
                </Grid>
                {rooms?.map((room) => (
                <Grid key={room._id} item xs={12} sm={12} md={6} lg={3}>
                    <RoomCard room={room}/>
                    {/* <RoomRequestCard roomRequest={roomRequest}  /> */}
                </Grid>
                ))}
            </Grid>
        )
      
    )
  );
};

export default Rooms;