import React from 'react'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
function HostelForm() {
  return (
      <div>
          <Typography gutterBottom variant="h3" align="center">
              Create new hostel
          </Typography>
          <Grid>
              <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                  <CardContent>
                      <Typography gutterBottom variant="h5">
                          Contact Us
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                          Fill up the form and our team will get back to you within 24 hours.
                      </Typography>
                      <form>
                          <Grid container spacing={1}>
                              <Grid xs={12} sm={6} item>
                                  <TextField placeholder="Enter name of hostel" label="Hostel Name" variant="outlined" fullWidth required />
                              </Grid>
                              <Grid xs={12} sm={6} item>
                                  <TextField placeholder="Enter address of hostel" label="Hostel Address" variant="outlined" fullWidth required />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField type="number" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth required />
                              </Grid>
                              <Grid item xs={12}>
                                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                              </Grid>

                          </Grid>
                      </form>
                  </CardContent>
              </Card>
          </Grid>
      </div>
  )
}

export default HostelForm
