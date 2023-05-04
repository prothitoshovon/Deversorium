import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'

import Input from '../Input/Input.js'

import { signin } from '../../actions/Login.js';
import { getUserByEmail } from '../../actions/Users.js';
import { AUTH } from '../../constants/actionTypes';

function Login() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const initialState = {  email: '', password: '' };
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }


      useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signin(form, navigate));
        //dispatch(getHostelByOwnerId(user?.result?._id)) 

        //const val = dispatch(getUserByEmail(form.email))
        //console.log(val)
    }
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div>
    
      <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    {/* <h2 style={headerStyle}>Sign Up</h2> */}
                    <Typography variant="h4">
                        Login to Deversorium
                    </Typography>
                    <Typography variant='caption' gutterBottom>
                    
                    Don't have an account? &nbsp;
                    <Link to="/">Register here</Link>
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing = {2}>      
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button style={{marginTop:"20px", backgroundColor:'#0C21C1', color:'white'}}type='submit' variant='contained'>Login</Button>
                </form>
            </Paper>
        </Grid>
    </div>
  )
}

export default Login
