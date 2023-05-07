import React, {useState, useEffect} from 'react'
import * as api from '../../../api/index'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import DefaultMessage from '../../DefaultMessage/DefaultMessage'
import ItemCard from '../../Menu/ItemCard'

function Mealsheet() {

  const [user,setUser] =  useState(JSON.parse(localStorage.getItem('profile')))
    const [hostels, setHostels] = useState([])
    const [loading, setLoading] = useState(true)
    const [mealItems, setMealItems] = useState([])
    const [tenants, setTenants] = useState([])
    const [item, setItem] = useState()
    const fetchData = async() =>{
      try {
        const {data} = await api.getTenantsByUserId(user?.result?._id)
        setTenants([...tenants,data])
        const hostelData = await api.getHostelByHostelId(data.hostel_id)
        setHostels([...hostels, hostelData.data])
        const newData = await api.getMealItemsByHostel(data.hostel_id)
        setMealItems(newData.data)
        const date = new Date()
        const idx = date.getDay()%mealItems.length
        setItem(mealItems[idx])
        console.log(mealItems[idx])
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
        
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    loading?<CircularProgress/>:
    hostels.length===0||!hostels[0]?<DefaultMessage message='You are not part of any hostel'/>:
    !hostels[0].has_meal_system?<DefaultMessage message='Your owner has not created any meal sheet yet'/>:
    !tenants[0].joined_meal_system?<DefaultMessage message='You are not part of the meal system yet. Go to hostel page to join'/>:
    <Grid container spacing={2} >
      <Grid item xs={6} md={8}>
        <DefaultMessage message="What's in the menu for today?"/>
          <ItemCard item ={item} />
      </Grid>
    </Grid>
    
    
  )
}

export default Mealsheet
