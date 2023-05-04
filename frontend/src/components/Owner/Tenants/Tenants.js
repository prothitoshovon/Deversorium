import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getTenantsByHostelId } from '../../../actions/Tenants';
import { Grid, CircularProgress } from '@material-ui/core';
import TenantCard from './TenantCard';

function Tenants() {
    const dispatch = useDispatch()
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')))
    const { tenants, isLoading } = useSelector((state) => state.tenants);
    
    const { hostels } = useSelector((state) => state.hostels);
    useEffect(()=>{
        if(!hostels)console.log('no hostel')
        else if(hostels.length === 0)
        {
            console.log('eta kore hoise')
            dispatch(getHostelByOwnerId(user?.result?._id))
        }
    },[])
    useEffect(()=>{
        if(!hostels)console.log('no hostel')
        else if(hostels)
        {
            if(!tenants)console.log('No tenants ever')
            else if(tenants.length ===0)dispatch(getTenantsByHostelId(hostels._id))
        }
    },[])
    if(!tenants)return 'You do not have a hostel right now'
    if (!tenants.length && !isLoading) return 'No tenants yet';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid style={{display:'block'}} container alignItems="stretch" spacing={3}>
        {tenants?.map((tenant) => (
          <Grid key={tenant._id} item xs={12} sm={12} md={6} lg={3}>
            <TenantCard tenant={tenant}/>
            {/* <RoomRequestCard roomRequest={roomRequest}  /> */}
          </Grid>
        ))}
      </Grid>
    )
  );
  
}

export default Tenants
