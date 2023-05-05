import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getTenantsByHostelId } from '../../../actions/Tenants';
import { Grid, CircularProgress } from '@material-ui/core';
import TenantCard from './TenantCard';
import DefaultMessage from '../../DefaultMessage/DefaultMessage';
import * as api from '../../../api/index'

function Tenants() {
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  //const { tenants, tenantsLoading } = useSelector((state) => state.tenants);

  //const { hostels } = useSelector((state) => state.hostels);
  const [tenants, setTenants] = useState([])
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const { data } = await api.getHostelByOwnerId(user?.result?._id)
    setHostels([...hostels, data])
    const newData = await api.getTenantsByHostelId(data._id)
    setTenants(newData.data)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    loading ? <CircularProgress /> : (
      tenants.length === 0 ? <DefaultMessage message='No tenants yet' /> :
        <Grid style={{ display: 'block' }} container alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <DefaultMessage message='Your Tenants' />
          </Grid>
          {tenants?.map((tenant) => (
            <Grid key={tenant._id} item xs={12} sm={12} md={6} lg={3}>
              <TenantCard tenant={tenant} />
              {/* <RoomRequestCard roomRequest={roomRequest}  /> */}
            </Grid>
          ))}
        </Grid>
    )
  );

}

export default Tenants
