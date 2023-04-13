import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '../Input/Input.js'

import { signin } from '../../actions/Login.js';
import { AUTH } from '../../constants/actionTypes';

function Login() {

  const initialState = {  email: '', password: '' };
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }



    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signin(form, navigate));
    }
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div>
    
      <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    {/* <h2 style={headerStyle}>Sign Up</h2> */}
                    <Typography variant="h4">
                        Register to Deversorium
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
                    <Button style={{marginTop:"20px"}}type='submit' variant='contained' color='primary'>Login</Button>
                </form>
            </Paper>
        </Grid>
    </div>
  )
}

export default Login
