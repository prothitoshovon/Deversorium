import React from 'react'
import {Route, Routes} from "react-router"
import ResponsiveAppBar from './components/Navbar/Navbar'
import Homepage from './components/Owner/Homepage/Homepage'
import Profile from './components/Owner/Profile/Profile'
import Hostel from './components/Owner/Hostel/Hostel'
import Mealsheet from './components/Owner/Mealsheet/Mealsheet'
import HostelForm from './components/Owner/HostelForm/HostelForm'
import { useDispatch } from 'react-redux';

function App() {
  return (
    <div>
        
            <ResponsiveAppBar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="Profile" element={<Profile/>}/>
                <Route path="Hostel" element={<Hostel/>}/>
                <Route path="Mealsheet" element={<Mealsheet/>}/>
                <Route path="HostelForm" element={<HostelForm/>}/>
            </Routes>
        
        
    </div>
  )
}

export default App
