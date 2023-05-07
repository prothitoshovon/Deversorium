import React, {useState, useEffect} from 'react'
import MealsheetForm from '../MealsheetForm/MealsheetForm'
import * as api from '../../../api/index'
import { CircularProgress } from '@material-ui/core'
import Menu from '../../Menu/Menu'
//Query to find the hostel from userId
//If the hostel has any mealsheet, then how today's menu, update meal system and delete mealsystem 
//If they don't , just directly show MealsheetForm 
function Mealsheet() {

    const [user,setUser] =  useState(JSON.parse(localStorage.getItem('profile')))
    const [hostels, setHostels] = useState([])
    const [loading, setLoading] = useState(true)
    const [mealItems, setMealItems] = useState([])
    const [tenants, setTenants] = useState([])
    const fetchData = async() =>{
      try {
        const {data} = await api.getHostelByOwnerId(user?.result?._id)
        if(data)setHostels([...hostels, data])
        const newData = await api.getMealItemsByHostel(data._id)
        setMealItems(newData.data)
        const tens = await api.getTenantsByHostelId(data._id)
        setTenants(tens.data)
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
    (
      hostels[0].has_meal_system ? <Menu items={mealItems} tenants={tenants}/>:<MealsheetForm/>
    )
  )
}

export default Mealsheet
