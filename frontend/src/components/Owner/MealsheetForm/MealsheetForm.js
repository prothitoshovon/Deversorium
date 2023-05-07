import React, {useState} from 'react'
import { Card, Grid, Typography, Button } from '@material-ui/core'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DefaultMessage from '../../DefaultMessage/DefaultMessage';

import useStyles from './styles'
function MealsheetForm() {

    const [checked, setChecked] = useState([true, true, false, false, false, false, false]);
    const [prices, setPrices] = useState([55,160,80,75,45,40,200])
    const classes = useStyles()
    const handleChange1 = (event) => {
        console.log('ekhane')
        const newChecked = [...checked]
        console.log(checked)
        for(let i=0;i<checked.length;i++)
        {
            newChecked[i] = event.target.checked
        }
        setChecked(newChecked)
    };

    

    const handleChange3 = (event, id) => {
        //console.log(id)
        const newChecked = [...checked]
        newChecked[id] = event.target.checked
        setChecked(newChecked)
        // setChecked([...checked, checked[id]=event.target.checked]);
    };
    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, marginLeft: '50px' }}>
            <Card className={classes.checkBox}>
                <Typography className={classes.prices}>Price:{
                 prices[0]
                 }tk</Typography>
                <FormControlLabel
                    className={classes.checkBoxItem}
                    label="Chicken"
                    control={<Checkbox style={{color:'#0C21C1'}}checked={checked[1]} onChange={(event) => handleChange3(event, 1)} />}
                />
            </Card>

            <Card className={classes.checkBox}>
                <Typography className={classes.prices}>Price:{
                 prices[1]
                 }tk</Typography>
                <FormControlLabel
                    className={classes.checkBoxItem}
                    label="Beef"
                    control={<Checkbox style={{color:'#0C21C1'}}checked={checked[2]} onChange={(event) => handleChange3(event, 2)} />}
                />
            </Card>

            <Card className={classes.checkBox}>
                <Typography className={classes.prices}>Price:{
                 prices[2]
                 }tk</Typography>
                <FormControlLabel
                    className={classes.checkBoxItem}
                    label="Rui Fish"
                    control={<Checkbox style={{color:'#0C21C1'}}checked={checked[3]} onChange={(event) => handleChange3(event, 3)} />}
                />
            </Card>

            <Card className={classes.checkBox}>
                <Typography className={classes.prices}>Price:{
                 prices[3]
                 }tk</Typography>
                <FormControlLabel
                    className={classes.checkBoxItem}
                    label="Katol Fish"
                    control={<Checkbox style={{color:'#0C21C1'}} checked={checked[4]} onChange={(event) => handleChange3(event, 4)} />}
                />
            </Card>

            <Card className={classes.checkBox}>
                <Typography className={classes.prices}>Price:{
                 prices[4]
                 }tk</Typography>
                <FormControlLabel
                    className={classes.checkBoxItem}
                    label="Vegetable"
                    control={<Checkbox style={{color:'#0C21C1'}}checked={checked[5]} onChange={(event) => handleChange3(event, 5)} />}
                />
            </Card>

            <Card className={classes.checkBox}>
                <Typography className={classes.prices}>Price:{
                 prices[6]
                 }tk</Typography>
                <FormControlLabel
                    className={classes.checkBoxItem}
                    label="Mutton"
                    control={<Checkbox style={{color:'#0C21C1'}}checked={checked[6]} onChange={(event) => handleChange3(event, 6)} />}
                />
            </Card>

        </Box>
    );
    return (
        <div>
            <Grid>
                <DefaultMessage message="Select the food options for your mealsystem" />
                <FormControlLabel
                    label="Select all"
                    control={
                        <Checkbox
                            style={{color:'#0C21C1'}}
                            checked={checked[0] && checked[1]}
                            indeterminate={checked[0] !== checked[1]}
                            onChange={handleChange1}
                            
                        />
                    }
                />
                {children}
            </Grid>
            <Button style={{color:'white', backgroundColor:'#0C21C1', marginLeft:'55px', marginTop:'10px'}}>Generate sheet</Button>
        </div>
    )
}

export default MealsheetForm
