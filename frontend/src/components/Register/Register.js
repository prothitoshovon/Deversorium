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

import { signup } from '../../actions/Register.js';
import { AUTH } from '../../constants/actionTypes';
// TODO Refactoring needed for userRole
const Register=()=> {

    const initialState = { firstName: '', lastName: '', email: '', password: '', phone:'',confirmPassword: '', role:0 };
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 20 }
    const [userRole, setUserRole] = useState(0)


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        if(userRole===1)form.role=2
        else form.role=1
        if(form.confirmPassword !== form.password)
        {
            console.log("passwords don't match")
        }
        else dispatch(signup(form, navigate));
         
    }
    const onCheckedOwner =()=>{
        setUserRole((prevUser) => prevUser=1)
    }
    const onCheckTenant =()=>{
        setUserRole((prevUser) => prevUser=2)
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
                    
                    If you already have an account, please &nbsp;
                    <Link to="/Login">login to continue</Link>
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing = {2}>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                        
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="phone" label="Phone Number" handleChange={handleChange} type="number" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />

                        <FormControl component="fieldset" style={{marginLeft:"10px", marginTop:"10px"}}>
                        <FormLabel component="legend">{userRole==0 ? 'Choose your role':userRole==1?'I am a Hostel Owner':'I am a Tenant'} </FormLabel>
                        <RadioGroup  onChange={handleChange}aria-label="userType" name="userType" style={{ display: 'initial' }}>
                            <FormControlLabel  onClick={onCheckedOwner} value="Hostel Owner" control={<Radio />} label="Hostel Owner" />
                            <FormControlLabel  onClick={onCheckTenant}value="Tenant" control={< Radio />} label="Tenant" />
                        </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Button style={{marginTop:"20px"}}type='submit' variant='contained' color='primary'>Register</Button>
                </form>
            </Paper>
        </Grid>
    </div>
  )
}

export default Register
