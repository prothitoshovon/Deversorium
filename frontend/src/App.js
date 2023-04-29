import React, { useEffect, useState } from 'react'
import {Route, Routes} from "react-router"
import ResponsiveAppBar from './components/Navbar/Navbar'
import Homepage from './components/Owner/Homepage/Homepage'
import Profile from './components/Owner/Profile/Profile'
import Hostel from './components/Owner/Hostel/Hostel'
import Mealsheet from './components/Owner/Mealsheet/Mealsheet'
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
function App() {

  //TODO add safe routing for owners and tenants 
  console.log('app ni ')
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')))
    console.log(user)
    //window.location.reload(false);

  },[]
  )

  return (
    <div>
      
      <ResponsiveAppBar user={user} setUser={setUser}/>
        {/* <ReviewCard/> */}
      <Routes>
            <Route element={<AuthRoutes/>}>
              <Route exact path="/" element={<Register/>}/>
              <Route exact path="Login" element={<Login/>}/>
            </Route>
              <Route element={<SafeRoutes/>}>
                    <Route path="Homepage" element={user?.result?.role===2?<Homepage  />:<TenantHomepage />}/>
                    <Route path="Profile" element={<Profile/>}/>
                    <Route path="Hostel" element={user?.result?.role===2?<Hostel/>:<TenantHostel/>}/>
                    <Route element={<HostelFormRoutes/> }>
                      <Route path="HostelForm" element={<HostelForm/>}/>
                    </Route>       
            </Route>
      </Routes>
    </div>
  )
}

export default App
