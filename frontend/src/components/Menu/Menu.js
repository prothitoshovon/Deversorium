import { React, useEffect, useState } from 'react'
import { Paper, Grid, Button, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2'
import DefaultMessage from '../DefaultMessage/DefaultMessage';
import ItemCard from './ItemCard';
function Menu({items,tenants}) {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [item, setItem] = useState()
    useEffect(()=>{
        console.log(items)
        const date =  new Date()
        const idx = date.getDay()%items.length
        setItem(items[idx])
    },[])
  return (
    <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
            {/* <Item>xs=6 md=8</Item> */}
            <DefaultMessage message="What's in today's menu?"/>
            <ItemCard item={item} tenants={tenants.length}/>
        </Grid>
        <Grid item xs={6} md={4}>
            <DefaultMessage message='Not happy with your meal menus?'/>
            <Button>Edit meal system</Button>
        </Grid>
    </Grid>
  )
}

export default Menu
