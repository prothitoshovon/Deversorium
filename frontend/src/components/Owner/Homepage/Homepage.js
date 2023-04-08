import React from 'react'
import {Route, Routes} from "react-router"
import HostelForm from '../HostelForm/HostelForm'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material'
function Homepage() {
  return (
    <div>
   <Link to="/HostelForm">
    <Button variant="contained" startIcon={<AddIcon/>} >
        
       
    </Button>
    </Link> 
    </div>
    
  )
}

export default Homepage
