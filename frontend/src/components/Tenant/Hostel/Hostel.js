import React, { useState } from 'react'
import HostelCard from '../../HostelCard/HosetlCard'
import {Button, Typography,TextField} from '@material-ui/core'
import {  CircularProgress,Rating, Grid } from '@mui/material';
import useStyles from './styles'
//TODO Fetch the tenant from its user ID 
//If the tenant has a room assigned then we will display Hostel card 
//If the tenant does not have  a room assigned, then we will display You are not part of any hostel 
//If tenant has requested and not assigned, then owner has not approved your request. cancel ?

function Hostel() {
  const classes = useStyles()
  const [value, setValue] = useState(5)
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <HostelCard/>
      </Grid>
      <Grid item xs={4}>
        <Button variant='contained' className={classes.cardActions}>
          Join meal system
        </Button>
      </Grid> 
      <Grid item xs={8} style={{display:'block'}} >
        
        <Rating
          
          className={classes.rating}
          precision={0.5}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        
      </Grid>
      
      <Grid item xs={4}>
        <Typography className={classes.ratingHeader}>
        Rate us
        </Typography>
        {/* <TextField multiline className={classes.textField}>
        
        </TextField> */}
      </Grid>
      <Grid item xs={8}>
        <Typography className={classes.ratingHeader}>
        Rate us
        </Typography>
      </Grid>
      
    </Grid>
  )
}

export default Hostel
