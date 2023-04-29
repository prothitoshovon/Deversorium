import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHostelByOwnerId } from '../../actions/hostels'
import HostelForm from '../Owner/HostelForm/HostelForm';
import BadGateway from './BadGateway';
function HostelFormRoutes() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const {hostels} = useSelector((state) => state.hostels)
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(getHostelByOwnerId(user?.result?._id))   
    },[])
  return (
        hostels?(<BadGateway/>):(
          <HostelForm/>
        )
        //  hostels === null || hostels.length !==0 ?(
            
        //     <BadGateway/>
        // ):
        // (
        //     <HostelForm/>
        // )
    
  )
}

export default HostelFormRoutes
