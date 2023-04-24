import React from 'react'
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
function App() {

  //TODO add safe routing for owners and tenants 
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <div>
      
      <ResponsiveAppBar/>
      {/* <RoomCard/> */}
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="Login" element={<Login/>}/>
        <Route path="Homepage" element={<Homepage />}/>
        <Route path="Profile" element={<Profile/>}/>
        <Route path="THomepage" element={<TenantHomepage/>}/>
        <Route path="HostelForm" element={<HostelForm/>}/>
        <Route path="Hostel" element={<Hostel/>}/>
        <Route path="THostel" element={<TenantHostel/>}/>
      </Routes>
    </div>
  )
}

export default App
