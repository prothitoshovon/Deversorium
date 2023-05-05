import { Typography } from '@material-ui/core'
import React from 'react'

function DefaultMessage({message}) {
  return (
    <Typography variant='h4' gutterBottom style={{display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'20px'
    }}>
        {message}
    </Typography>
  )
}

export default DefaultMessage
