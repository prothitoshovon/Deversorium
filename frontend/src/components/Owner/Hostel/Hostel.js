import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Paper, Grid, Button, Card, CardContent, Typography } from '@material-ui/core';
import Input from '../../Input/Input';
import { getHostelByOwnerId } from '../../../actions/hostels';
import { createRoom } from '../../../actions/Rooms'
import Axios from 'axios';
import moment from 'moment';
import ReviewCard from '../../ReviewCard/ReviewCard';
import { getReviewsByHostel } from '../../../actions/Reviews';
import { getTenantsByUserId } from '../../../actions/Tenants';
import { styled } from '@mui/material/styles';
import ComplaintCardList from '../../ComplaintCardList/ComplaintCardList';
import { getComplaintsByHostel } from '../../../actions/Complaints';
function Hostel() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        }));
    const initialState = { number: '', area: '', rent: '' };
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const paperStyle = { padding: '30px 20px', width: 400, margin: "20px auto", float: "left" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 20 }
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const { hostels } = useSelector((state) => state.hostels);
    const { tenants } = useSelector((state) => state.tenants)
    const {complaints} = useSelector((state) => state.complaints )
    const handleSubmit = (e) => {
        //Query to find hostelID using ownerID 
        e.preventDefault()
        var date = new Date()
        dispatch(createRoom({
            room_number: form.number,
            area: form.area,
            rent: form.rent,
            hostel_id: hostels._id,
            hostel_address: hostels.address,
            hostel_name: hostels.name,
            next_vacancy_date: date
        }))

        setForm(initialState)
        window.location.reload(false)

    }
    useEffect(()=>{
        if(!hostels)console.log('no hostel')
        else if(hostels.length === 0)dispatch(getHostelByOwnerId(user?.result?._id))
    },[hostels])
    useEffect(() => {
        
        if(!hostels)
        {
            console.log('hehehe')
            console.log(user?.result?._id)
            dispatch(getHostelByOwnerId(user?.result?._id))
        }
        else if(hostels)
        {
            console.log('srsly')
            dispatch(getComplaintsByHostel(hostels._id))
            //dispatch(getReviewsByHostel(hostels._id))
        }

        
    }, [hostels])
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    return (
        
            <div style={{marginTop:'40px'}}>
            {
                hostels ? (
                    <Grid container spacing={2}>
                        <Grid item xs={4} md={6}>
                            <Typography gutterBottom variant='h5'>
                                Complaints of your hostel
                            </Typography>
                                        
                            <ComplaintCardList/>
                            
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography gutterBottom variant='h5' style={{marginLeft:'20px',}}>
                                Need more rooms in your hostel?
                            </Typography>
                            <Card style={{ maxWidth: 450, padding: "20px 5px",backgroundColor:'#F8F8F8' }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" style={{marginTop:'0'}}>
                                        Add a new room!
                                    </Typography>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid xs={12} sm={6} item>
                                                <Input name="number" label="Enter room number" handleChange={handleChange}       type="number" />

                                            </Grid>
                                            <Grid xs={12} sm={6} item>
                                                <Input name="area" label="Enter room area" handleChange={handleChange} type="number" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Input name="rent" label="Enter room rent" handleChange={handleChange} type="number" />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button type="submit" variant="contained" style={{backgroundColor:'#0C21C1', color:'white'}} fullWidth>Submit</Button>
                                            </Grid>

                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                ) :
                    (
                        <Grid>
                            <Typography gutterBottom variant='h5' style={{marginLeft:'20px',}}>
                                You do not have a hostel right now
                            </Typography>
                            <Link to="/HostelForm">
                                <Button variant="contained" startIcon={<AddIcon />} >Create your hostel
                                </Button>
                            </Link>
                        </Grid>

                    )
        }
        </div>      
    )
}

export default Hostel
