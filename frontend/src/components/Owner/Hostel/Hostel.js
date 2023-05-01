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
    // console.log('WOW ok')
    // console.log(user)
    const { hostels } = useSelector((state) => state.hostels);
    const { reviews } = useSelector((state) => state.reviews)
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
    useEffect(() => {
        
        if(hostels.length === 0)
        {
            console.log('hehehe')
            console.log(user?.result?._id)
            dispatch(getHostelByOwnerId(user?.result?._id))
        }
        else
        {
            console.log('srsly')
            dispatch(getReviewsByHostel(hostels._id))
        }

        
    }, [hostels])
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    return (
        
            <div>
            {
                hostels ? (
                    <Grid container spacing={2}>
                    
                        <Grid item xs={6} md={4}>
                            <Typography gutterBottom variant='h5'>
                                These are your reviews of the hostel
                            </Typography>
                            {
                                reviews ? (
                                    reviews?.map((review) => (
                                        <Grid key={review._id} >
                                            <ReviewCard review={review} reviewer={tenants} />
                                        </Grid>
                                    ))
                                ) :
                                    (
                                        <div>No reviews so far</div>
                                    )

                            }
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Typography gutterBottom variant='h5'>
                                These are your reviews of the hostel
                            </Typography>
                            {
                                complaints ? (
                                    <ComplaintCardList/>
                                    )
                                    :
                                    (
                                        <div>No reviews so far</div>
                                    )

                            }
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "10px auto" }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" style={{marginTop:'0'}}>
                                        Add new room to your hostel
                                    </Typography>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={1}>
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
                                                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
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
                            <h2> You do not have a hostel right now</h2>
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
