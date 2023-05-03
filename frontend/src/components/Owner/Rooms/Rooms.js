import React, { useState,useEffect } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ReviewCard from '../../ReviewCard/ReviewCard'
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getRoomsByHostelId } from '../../../actions/Rooms';
import RoomCard from './RoomCard';

const Rooms = ({ setCurrentId }) => {
    //Need Hostel by owner ID 
    //Need reviews by hostel ID
    const dispatch = useDispatch()
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')))
    const { rooms, isLoading } = useSelector((state) => state.rooms);
    
    const { hostels } = useSelector((state) => state.hostels);
    useEffect(()=>{
        console.log('hono')
        if(!hostels)console.log('no hostel')
        else if(hostels.length === 0)dispatch(getHostelByOwnerId(user?.result?._id))
    },[hostels])
    useEffect(()=>{
        console.log('aichhi')
        if(hostels)
        {
            if(!rooms)console.log('No rooms ever')
            else if(rooms.length===0)dispatch(getRoomsByHostelId(hostels._id))
        }
    },[rooms])
  //if (!rooms.length && !isLoading) return 'No rooms pending';

  return (
    isLoading ? <CircularProgress /> : (
        rooms.length ===0?(<h2>No rooms to show</h2>):(
            <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
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