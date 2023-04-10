import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '../Input/Input.js'
// TODO Refactoring needed for userRole
const Register=()=> {


    const paperStyle = { padding: '30px 20px', width: 600, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 20 }
    const [userRole, setUserRole] = useState(0)
    const onCheckedOwner =()=>{
        setUserRole((prevUser) => prevUser=1)
    }
    const onCheckTenant =()=>{
        setUserRole((prevUser) => prevUser=2)
    }
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
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">{userRole==0 ? 'Choose your role':userRole==1?'I am a Hostel Owner':'I am a Tenant'} </FormLabel>
                        <RadioGroup aria-label="user-type" name="user-type" style={{ display: 'initial' }}>
                            <FormControlLabel  onClick={onCheckedOwner} value="Hostel Owner" control={<Radio />} label="Hostel Owner" />
                            <FormControlLabel  onClick={onCheckTenant}value="Tenant" control={<Radio defaultChecked={true} />} label="Tenant" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" type={'number'} />
                    <TextField fullWidth label='Password' placeholder="Enter your password" type={'password'} />
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" type={'password'}/>
                    
                    <Button style={{marginTop:"20px"}}type='submit' variant='contained' color='primary'>Register</Button>
                </form>
            </Paper>
        </Grid>
    </div>
  )
}

export default Register
