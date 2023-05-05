import React, {useEffect, useState} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import RoomRequestCard from '../RoomRequestCard/RoomRequestCard';
import ComplaintCard from '../ComplaintCard/ComplaintCard';
import { getHostelByOwnerId } from '../../actions/hostels';
import { getComplaintsByHostel } from '../../actions/Complaints';
import { getRoomsByHostelId } from '../../actions/Rooms';
import DefaultMessage from '../DefaultMessage/DefaultMessage';
const ComplainCardList = ({ setCurrentId }) => {
  const { complaints, complaintsLoading } = useSelector((state) => state.complaints);
  const { hostels, hostelsLoading } = useSelector((state) => state.hostels);

  const dispatch = useDispatch()
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
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
            if(!complaints)console.log('No rooms ever')
            else if(complaints.length===0)
            {
                dispatch(getComplaintsByHostel(hostels._id))
            }
            else console.log(complaints)
        }
    },[])
    if(!hostels)return 'No hostel'
  //if (!complaints.length && !isLoading) return 'No Complaints';

  return (
    complaintsLoading ? <CircularProgress /> : (
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={1}>
        <Grid  item xs={4} sm={12} md={6} lg={3}>
          <DefaultMessage message='Pending Complaints'/>
        </Grid>
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