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

function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    // <div>
    //     {
    //       user ? (
    //         <>
    //             {/* If the user exists */}
    //             <ResponsiveAppBar/>
    //           <Routes>
    //               <Route path="/" element={<Homepage />}/>
    //               <Route path="Profile" element={<Profile/>}/>
    //               <Route path="Hostel" element={<Hostel/>}/>
    //               <Route path="Mealsheet" element={<Mealsheet/>}/>
    //               <Route path="HostelForm" element={<HostelForm/>}/>
    //           </Routes>
    //           </>
    //       ) :
    //         (
    //           <Routes>
    //             <Route path="/" element={<Register/>}/>
    //             <Route path="Login" element={<Login/>}/>
    //             <Route path="Homepage" element={<Homepage/>}/>

    //           </Routes>
              
    //         )
    //     }
    // </div>
    <div>
      
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="Login" element={<Login/>}/>
        <Route path="Homepage" element={<Homepage />}/>

      </Routes>
    </div>
  )
}

export default App
