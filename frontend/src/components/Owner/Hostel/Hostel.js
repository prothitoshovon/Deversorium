import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Paper,Grid, Button, Card, CardContent, Typography } from '@material-ui/core';
import Input from '../../Input/Input';
import { getHostelByOwnerId } from '../../../actions/hostels';
function Hostel() {

    const initialState = { number: '', area: '', rent: '' };
    const [form, setForm] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const paperStyle = { padding: '30px 20px', width: 400, margin: "20px auto", float:"left" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 20 }
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const handleSubmit = (e) => {
        //Query to find hostelID using ownerID 
        e.preventDefault()
        const {x} = dispatch(getHostelByOwnerId({id:user?.result?._id}))
        console.log(x)
        
         
    }
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div>
      <Grid >
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    {/* <h2 style={headerStyle}>Sign Up</h2> */}
                    <Typography variant="h4">
                        Add a new Room
                    </Typography>
                    <Typography variant='caption' gutterBottom>
                      Rent is for every individual per month
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing = {2}>      
                        <Input name="number" label="number" handleChange={handleChange} type="number" />
                        <Input name="area" label="area" handleChange={handleChange} type="number" />
                        <Input name="rent" label="rent" handleChange={handleChange} type="number" />
                    </Grid>
                    <Button style={{marginTop:"20px"}}type='submit' variant='contained' color='primary'>Add</Button>
                </form>
            </Paper>
        </Grid>
    </div>
  )
}

export default Hostel
