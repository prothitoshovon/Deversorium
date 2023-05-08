import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Paper, Grid, Button, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import Input from '../../Input/Input';
import { createRoom } from '../../../actions/Rooms'
import { styled } from '@mui/material/styles';
import ComplaintCardList from '../../ComplaintCardList/ComplaintCardList';
import Swal from 'sweetalert2'
import * as api from '../../../api/index'
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

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [hostels, setHostels] = useState([])
    const [complaints, setComplaints] = useState([])
    const [loading, setLoading] = useState(true)


    const handleSubmit = async (e) => {
        //Query to find hostelID using ownerID 
        e.preventDefault()
        var date = new Date()
        const curForm = {
            room_number: form.number,
            area: form.area,
            rent: form.rent,
            hostel_id: hostels[0]._id,
            hostel_address: hostels[0].address,
            hostel_name: hostels[0].name,
            next_vacancy_date: date
        }
        try {
            const data = await api.createRoom(curForm)

            Swal.fire({
                icon: 'success',
                title: 'Your room was added',
                confirmButtonColor:'#0C21C1',

            }).then(() => {
                window.location.reload(false)
            })
            setForm(initialState)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Room number already in use',
                confirmButtonColor:'#0C21C1',

            })
        }
        
    }

    const fetchData = async () => {
        try {
            const { data } = await api.getHostelByOwnerId(user?.result?._id)
        //console.log(data)
            if(data)
            setHostels([...hostels, data])
            const newData = await api.getComplaintsByHostel(data._id)
            // console.log(newData.data)
            if(newData)
            setComplaints(newData.data)

            setLoading(false)
            
        } catch (error) {
            setLoading(false)
        }
        
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    return (

        <div style={{ marginTop: '10px' }}>
            {
                loading ? <CircularProgress /> :

                    (
                        hostels.length !== 0 ? (
                            <Grid container spacing={2}>
                                <Grid item xs={4} md={6}>

                                    <ComplaintCardList complaints={complaints} />

                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Typography gutterBottom variant='h5' style={{ marginLeft: '20px',marginTop:'30px' }}>
                                        Need more rooms in your hostel?
                                    </Typography>
                                    <Card style={{ maxWidth: 450, padding: "20px 5px", backgroundColor: '#F8F8F8' }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" style={{ marginTop: '0' }}>
                                                Add a new room!
                                            </Typography>
                                            <form onSubmit={handleSubmit}>
                                                <Grid container spacing={2}>
                                                    <Grid xs={12} sm={6} item>
                                                        <Input isRequired={true} name="number" label="Enter room number" handleChange={handleChange} type="number" />

                                                    </Grid>
                                                    <Grid xs={12} sm={6} item>
                                                        <Input isRequired={true} name="area" label="Enter room area" handleChange={handleChange} type="number" />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Input isRequired={true}name="rent" label="Enter room rent" handleChange={handleChange} type="number" />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button type="submit" variant="contained" style={{ backgroundColor: '#0C21C1', color: 'white' }} fullWidth>Submit</Button>
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
                                    <Typography gutterBottom variant='h5' style={{ marginLeft: '10px', }}>
                                        You do not have a hostel right now
                                    </Typography>
                                    <Link to="/HostelForm" style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            style={{
                                                color: 'white',
                                                backgroundColor: '#0C21C1',
                                                marginLeft: '10px'
                                            }}
                                        >
                                            Create your hostel
                                        </Button>
                                    </Link>
                                </Grid>

                            )

                    )
            }
        </div>
    )
}

export default Hostel
