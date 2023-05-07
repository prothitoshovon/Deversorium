import React, { useEffect, useState } from 'react'
import {Route, Routes} from "react-router"
import ResponsiveAppBar from './components/Navbar/Navbar'
import Homepage from './components/Owner/Homepage/Homepage'
import Profile from './components/Owner/Profile/Profile'
import Hostel from './components/Owner/Hostel/Hostel'
import Mealsheet from './components/Owner/Mealsheet/Mealsheet'
import TenantMealsheet from './components/Tenant/Mealsheet/Mealsheet'
import HostelForm from './components/Owner/HostelForm/HostelForm'
import { useDispatch } from 'react-redux';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import TenantHomepage from './components/Tenant/Homepage/Homepage.js'
import TenantHostel from './components/Tenant/Hostel/Hostel.js'
import RoomCard from './components/RoomCard/RoomCard'
import SafeRoutes from './components/SafeRoutes/SafeRoutes.js'
import OwnerRoutes from './components/SafeRoutes/OwnerRoutes'
import HostelFormRoutes from './components/SafeRoutes/HostelFormRoutes'
import AuthRoutes from './components/SafeRoutes/AuthRoutes'
import TenantRoutes from './components/SafeRoutes/TenantRoutes'
import HostelCard from './components/HostelCard/HosetlCard'
import ReviewCard from './components/ReviewCard/ReviewCard'
import {Grid} from '@material-ui/core'
import ComplaintCard from './components/ComplaintCard/ComplaintCard'
import Reviews from './components/Owner/Reviews/Reviews'
import BadGateway from './components/SafeRoutes/BadGateway'
import Tenants from './components/Owner/Tenants/Tenants'
import Rooms from './components/Owner/Rooms/Rooms'
import MealsheetForm from './components/Owner/MealsheetForm/MealsheetForm'
function App() {

  //TODO add safe routing for owners and tenants 
  //console.log('app ni ')
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')))
    //console.log(user)
    //window.location.reload(false);

  },[]
  )

  return (
    <div>
      <Grid>
        <Grid>
          <ResponsiveAppBar  user={user} setUser={setUser}/>
        </Grid>
        {/* <ComplaintCard/> */}
        <Grid>
          <Routes>
            <Route element={<AuthRoutes/>}>
              <Route exact path="/" element={<Register/>}/>
              <Route exact path="Login" element={<Login/>}/>
            </Route>
              <Route element={<SafeRoutes/>}>
                    <Route path="Homepage" element={user?.result?.role===2?<Homepage  />:<TenantHomepage />}/>
                    <Route path="Profile" element={<Profile/>}/>
                    <Route path="Hostel" element={user?.result?.role===2?<Hostel/>:<TenantHostel/>}/>
                    <Route path="Reviews" element={user?.result?.role===2?<Reviews/>:<BadGateway/>}/>
                    <Route path="Tenants" element={user?.result?.role===2?<Tenants/>:<BadGateway/>}/>
                    <Route path="Rooms" element={user?.result?.role===2?<Rooms/>:<BadGateway/>}/>
                    <Route path="MealsheetForm" element={user?.result?.role===2?<MealsheetForm/>:<BadGateway/>}/>
                    <Route path="Mealsheet" element={user?.result?.role===2?<Mealsheet/>:<TenantMealsheet/>}/>
                    <Route element={<HostelFormRoutes/> }>
                      <Route path="HostelForm" element={<HostelForm/>}/>
                    </Route>       
            </Route>
          </Routes>
        </Grid>
      </Grid>
      
        {/* <ReviewCard/> */}
      
    </div>
  )
}

export default App
