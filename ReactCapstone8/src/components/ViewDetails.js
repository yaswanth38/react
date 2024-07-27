import React from "react";
import { Grid, Typography, withStyles, CardContent, CardActions, CardMedia, Card, Button, CardHeader, } from "@material-ui/core";
import Axios from "axios";
import { Error } from "@material-ui/icons";
import { Link } from "react-router-dom";
import ShareIcon from "@material-ui/icons/Share"

const useStyles = (theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '10',
    marginTop: '5%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: 15,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});
function handleShareClick() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    })
      .then(() => console.log('shared'))
      .catch((error) => console.log('Error'));
  } else {
    console.log('Share not supported');
  }
}

class ViewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.user = sessionStorage.getItem('user');

    this.state = {
      proid: this.props.match.params.propertyId,
      data: [],
      successMsg: "",
      errorMsg: ""
    }
  }

  componentDidMount() {
    this.getProperty()
  }
  getProperty() {
    Axios.get(`http://localhost:5500/explore/${this.state.proid}`)
      .then((response) => {
        this.setState({
          data: response.data,
          successMsg: "Data Added Successfully",
        });
        console.log(response.data);
      })
      .catch((error) => {
        this.setState({
          errorMsg: error.response,
        });
      });
  }
  displayproperty = () => {
    return (
      <div>
        <Grid container spacing={2} style={{ marginTop: 30 }}>
          <Grid item md={4} xs={4} >
            <Card style={{ height: 180, width: 290, marginTop: 35 }}>
              <CardMedia
                component={"img"}
                image={`.${this.state.data.imageUrls}`}
              />
            </Card>
            <Grid item md={8} xs={4} style={{ marginLeft: 14 }}>
              <Button
                component={Link} to={`/explore`}
                style={{ backgroundColor: "rgb(218, 3, 3)", color: "white", marginTop: 50 }}
                type="submit"
                fullWidth
                variant="contained"
              >
                GO BACK
              </Button>
            </Grid>

          </Grid>
          <Grid item md={7} xs={7} >
            <Card>
              <CardHeader style={{ textAlign: "center" }} title="Description"></CardHeader>
              <CardContent>
                <Typography variant="body2" color="textPrimary">
                  {this.state.data.description}
                </Typography>
                <Grid container>
                  <Grid item md={3} xs={3}>
                    <div>Size: {this.state.data.propertyArea}</div>
                    <div>Price: {this.state.data.price}</div>
                    <div>Advance: {this.state.data.Advance}</div>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <div>Transaction type:{this.state.data.transactionType}</div>
                    <div>Property age: {this.state.data.ageOfProperty}</div>
                    <div>Availability: {this.state.data.availabilityBy}</div>
                  </Grid>
                  <Grid item md={3} xs={3} >
                    <div>Bed rooms: {this.state.data.noOfBedrooms}</div>
                    <div>Bathroom: {this.state.data.noOfBathrooms}</div>
                    <div>Balcony: {this.state.data.noOfBalconies}</div>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  component={Link} to={`/book/${this.state.data.propertyId}/${this.state.data.ageOfProperty}`}
                  style={{ backgroundColor: "rgb(218, 3, 2)", color: "white", marginTop: 50 }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  BOOK A VISIT
                </Button>

                <Button
                  style={{ backgroundColor: "yellowgreen", color: "white", marginTop: 50 }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleShareClick}
                >
                  <ShareIcon /> Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }

  render() {
    console.log(this.props.match.params.propertyId);
    if (this.user != null) {
      return this.displayproperty();
    } else {
      return (<div>
        <Grid item md={12} style={{ marginTop: "4%", paddingLeft: "25%", paddingRight: "25%" }}>
          <Card >
            <CardContent>
              <Typography variant="h4" style={{ textAlignment: "center", color: "red" }} display="block" color="textPrimary">
                {<Error severity="error" style={{ color: "red" }}></Error>} <br></br> Please Login to the View the details of Property!!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </div>

      )
    }
  }

}
export default withStyles(useStyles, { withTheme: true })(ViewDetails);