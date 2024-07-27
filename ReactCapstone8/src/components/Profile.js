import React, { Component } from "react";
import { Grid, Typography, withStyles, CardContent, CardActions, CardMedia, Card, Button, CardHeader, IconButton } from "@material-ui/core";
import Axios from "axios";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: JSON.parse(localStorage.getItem("user"))
    }
  }


  render() {
    { console.log(this.state.userData) }
    return (

      <Grid container spacing={3} style={{ marginTop: "15%", marginLeft: "40%" }}>
        <Card>
          <CardHeader>
            <Typography variant='h4'><center><b> User Profile</b></center></Typography >
          </CardHeader>
          <CardContent>
            <Typography variant='h5'><center>Name: {this.state.userData.name}</center></Typography >
            <Typography variant='h5'><center>Email: {this.state.userData.emailId}</center></Typography>
            <Typography variant='h5'><center>Mobile No: {this.state.userData.mobNo}</center></Typography>
            <center><a href="http://localhost:3000/explore" class="btn btn-primary">Go Explore</a></center>
          </CardContent>
        </Card>
      </Grid>
    )


  }

}



export default Profile;