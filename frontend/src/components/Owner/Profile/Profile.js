import React, {useState} from 'react'

import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import Input from '../../Input/Input'
import { updateuser } from '../../../actions/Users';
import Swal from 'sweetalert2'
import * as api from '../../../api/index'
function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const initialState = { _id:user?.result?._id,name:user?.result?.name, phone:user?.result?.phone, email: user?.result?.email, password: '' };
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const ok = await api.updateuser(user?.result?._id,{...form, _id:user?.result?._id})
          const token = user?.token
          const newStorage = {
            result:ok.data,
            token
          }
          Swal.fire({
            title:"profile updated successfully! Login to continue",
            icon: "success"
          }).then(()=>{
            dispatch({type:'LOGOUT'})
            window.location.reload(false);
          })
        } catch (error) {
          Swal.fire({
            title:'Invalid password or form',
            icon:'error'
          })
        }
       
        //dispatch(getHostelByOwnerId(user?.result?._id)) 
        //dispatch(updateuser(user?.result?._id,{...form, _id:user?.result?._id}))
        //const val = dispatch(getUserByEmail(form.email))
        //console.log(val)
    }
  const cancel = () =>{
    navigate('/Homepage')
  }
  const paperStyle = { padding: '30px 20px', width: 600, margin: "10px 10px 10px 0px" }
  return (
    <div>
      <Grid>
        
            <Paper elevation={20} style={paperStyle}>
                <Grid align='left'>
                    {/* <h2 style={headerStyle}>Sign Up</h2> */}
                    <Typography variant="h4">
                        Edit your profile
                    </Typography>
                </Grid>
                <form style={{paddingTop:'20px'}}onSubmit={handleSubmit}>
                    <Grid container spacing = {2}> 
                        <Input name='name'  defaultValue={user?.result?.name}label='name' handleChange={handleChange} type='text'/>     
                        <Input name="email" defaultValue={user?.result?.email}  label='Email'handleChange={handleChange} type="email" autoFocus half />
                        <Input name='phone' defaultValue={user?.result?.phone} label='phone' handleChange={handleChange} type='number' half/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button style={{marginTop:"20px" ,marginRight:'20px', color:'white',backgroundColor:'#0C21C1'}}type='submit' variant='contained' >save</Button>
                    <Button style={{marginTop:"20px", color:'white',backgroundColor:'#0C21C1'}}onClick={cancel} variant='contained' >Cancel</Button>
                </form>
            </Paper>
        </Grid>
    </div>
  )
}

export default Profile
