import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getHostelByOwnerId } from '../../../actions/hostels';
import { getTenantsByHostelId } from '../../../actions/Tenants';
import { Grid, CircularProgress,Button,Paper } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import TenantCard from './TenantCard';
import DefaultMessage from '../../DefaultMessage/DefaultMessage';
import * as api from '../../../api/index'
import Swal from 'sweetalert2'
function Tenants() {
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  //const { tenants, tenantsLoading } = useSelector((state) => state.tenants);

  //const { hostels } = useSelector((state) => state.hostels);
  const [tenants, setTenants] = useState([])
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(true)
  const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

  const fetchData = async () => {
    try {
      const { data } = await api.getHostelByOwnerId(user?.result?._id)
      if(data)setHostels([...hostels, data])
      const newData = await api.getTenantsByHostelId(data._id)
      if(newData)setTenants(newData.data)
      setLoading(false)
        
    } catch (error) {
      setLoading(false)
    }
    
  }
  const numDays =  ( a,  b) =>
  {
      const diff = Math.abs(a-b)
      const days = Math.ceil(diff/(1000 * 60 * 60 * 24))
      return days
  }
  const sendBill =async () =>{
    //console.log(hostels[0].last_bill_generated_date)
    const date = new Date()
    const date2 =  new Date(hostels[0].last_bill_generated_date)
    //console.log(numDays(date,date2))
    if(numDays(date,date2) >= 30)
    {
      const {data} = await api.generateBill(hostels[0]._id)
      Swal.fire({
          title:'Bill has been sent to your tenants!',
          icon:'success',
          confirmButtonColor:'#0C21C1'
      }).then(()=>{
        window.location.reload(false);
      })
    }
    else
    {
      Swal.fire({
        title:'Must wait for next month to produce bill',
        icon:'error',
        confirmButtonColor:'#0C21C1'
      })
    }
    //This method will generate the bill
    // if(numDays(Date.now(), hostels[0].last_bill_generated_date) >= 30)
    // {
    //   //const {data} = await api.generateBill(hostels[0]._id)
    // }

    
    
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    loading ? <CircularProgress /> : (
      tenants.length === 0 ? <DefaultMessage message='No tenants yet' /> :
      <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
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
      </Grid>
      <Grid item xs={6} md={4}>
        <DefaultMessage message="Deploy the bills to the tenants for this month?"/>
        <Button onClick={sendBill} style={{backgroundColor:'#0C21C1', color:'white', marginTop:'20px', marginLeft:'40px'}} >Send Bill</Button>
      </Grid>
    </Grid>
      // <Grid>
     
      // </Grid>
        
    )
  );

}

export default Tenants
