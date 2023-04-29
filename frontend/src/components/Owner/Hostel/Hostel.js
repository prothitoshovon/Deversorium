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
function Hostel() {

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
    const { reviews } = useSelector((state) => state.reviews)
    const { tenants } = useSelector((state) => state.tenants)
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
        dispatch(getHostelByOwnerId(user?.result?._id))

        if (hostels !== null) {
            dispatch(getReviewsByHostel(hostels._id))

        }
        if (reviews !== null) {
            dispatch(getTenantsByUserId(reviews.user_id))
        }
    }, [])
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    return (
        
            
                hostels ? (
                    <Grid container  spacing={1} >
                        <Grid item xs={6}>
                            {
                                reviews && tenants ? (
                                    reviews?.map((review) => (
                                        <Grid key={review._id} >
                                            <ReviewCard review={review} reviewer={tenants} />
                                        </Grid>
                                    ))
                                ) :
                                    (
                                        <div>ok</div>
                                    )

                            }
                        </Grid>
                        <Grid item xs={6}>
                            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "60px auto" }}>
                                <CardContent>
                                    {/* <Typography gutterBottom variant="h5" style={{marginTop:'0'}}>
                                        Add new room to your hostel
                                    </Typography> */}
                                    {/* <form onSubmit={handleSubmit}>
                                        <Grid container spacing={1}>
                                            <Grid xs={12} sm={6} item>
                                                <Input name="number" label="Enter room number" handleChange={handleChange} type="number" />

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
                                    </form> */}
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

            

        
    )
}

export default Hostel
