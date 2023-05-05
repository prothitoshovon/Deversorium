import React, {useEffect, useState} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import RoomRequestCard from '../RoomRequestCard/RoomRequestCard';
import ComplaintCard from '../ComplaintCard/ComplaintCard';
import { getHostelByOwnerId } from '../../actions/hostels';
import { getComplaintsByHostel } from '../../actions/Complaints';
import { getRoomsByHostelId } from '../../actions/Rooms';
import DefaultMessage from '../DefaultMessage/DefaultMessage';
const ComplainCardList = ({ setCurrentId, complaints }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )

  return (
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={1}>
        <Grid  item xs={4} sm={12} md={6} lg={3}>
          <DefaultMessage message='Complaints raised'/>
        </Grid>
        {
          complaints.length === 0?
          <DefaultMessage message='No complaints pending'/>:
          (
            complaints?.map((complaint) => (
            <Grid key={complaint._id} item xs={12} sm={12} md={6} lg={3}>
              <ComplaintCard complaint={complaint} />
            </Grid>
            ))
          )
      }
      </Grid>  
  );
};

export default ComplainCardList;