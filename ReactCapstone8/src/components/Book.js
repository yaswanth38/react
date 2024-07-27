import React, { Component } from "react";
import { Link, } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import HouseOutlinedIcon from "@material-ui/icons/HouseOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Snackbar } from "@material-ui/core";
import { authenticate } from "../services/login.service";
import axios from 'axios';
import { Error } from "@material-ui/icons";
import { CardContent, Card } from "@material-ui/core";



const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Book extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      propertyCards: [],
      formdata: {
        propertyId: this.props.match.params.propertyId,
        propertyType: this.props.match.params.ageOfProperty,
        emailId: "",
        custName: "",
        phoneNo: "",
        pancard: "",
        VisitingDate: "",
        sellerId:this.props.match.params.propertyId,
      },
      formError: {
        emailErr: "",
        custNameErr: "",
        phoneNoErr: "",
        pancardErr: "",
        VisitingDateErr: ""
      },
      formValid: {
        emailId: false,
        custName: false,
        phoneNo: false,
        pancard: false,
        VisitingDate: false,
        buttonActive: false,
      },
      arrayData: [

      ],
      successMessage: "",
      errMessage: "",
      propertyIdPr: null,
      propertyTypePr: null,

    }
    var res = 0;
    var pus = 0;
  }


  validateField = (name, value) => {

    if (name === "emailId") {
      let emailRegx =
        /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?)|[7-9][0-9]{9}$/;
      if (!value.match(emailRegx)) {
        this.setState({
          formError: {
            ...this.state.formError,
            emailErr: 'Enter a valid Email, Eg:"abc@gmail.com"'
          }
        })
        this.state.formValid.emailId = false;
      }
      else {
        this.setState({
          formError: {
            ...this.state.formError,
            emailErr: ''
          }
        })
        this.state.formValid.emailId = true;

      }
    } else if (name === "pancard") {
      let passRegx = /^[A-Z]{5}[\d]{4}[A-Z]$/;
      if (!value.match(passRegx)) {
        this.setState({
          formError: {
            ...this.state.formError,
            pancardErr: "Please Enter Correct Pancard!"
          }
        })
        this.state.formValid.pancard = false;
      } else {
        this.setState({
          formError: {
            ...this.state.formError,
            pancardErr: ""
          }
        })
      }
      this.state.formValid.pancard = true;

    }
    else if (name === "phoneNo") {
      let numberRegx = /^[6-9][0-9]{9}$/;
      if (!value.match(numberRegx)) {
        this.setState({
          formError: {
            ...this.state.formError,
            phoneNoErr: 'only 10 numbers are allowed'
          }
        })
        this.state.formValid.phoneNo = false;
      }
      else {
        this.setState({
          formError: {
            ...this.state.formError,
            phoneNoErr: ''
          }
        })
        this.state.formValid.phoneNo = true;
      }

    }
    else if (name === "custName") {
      let nameRegEx = /^[A-Za-z][A-Za-z ]+$/;
      if (!value.match(nameRegEx)) {
        this.setState({
          formError: {
            ...this.state.formError,
            custNameErr: 'Enter a valid name'
          }
        })
        this.state.formValid.custName = false;
      }
      else {
        this.setState({
          formError: {
            ...this.state.formError,
            custNameErr: ''
          }
        })
        this.state.formValid.custName = true;
      }

    }
    else if (name === "VisitingDate") {
      const today = new Date().setHours(0, 0, 0, 0);
      const inputDate = new Date(value).setHours(0, 0, 0, 0);
      if (today > inputDate) {
        this.setState({
          formError: {
            ...this.state.formError,
            VisitingDateErr: 'Enter a valid Date'
          }
        })
        this.state.formValid.VisitingDate = false;
      }
      else {
        if (this.CheckDate(value) == 1) {
          this.setState({
            formError: {
              ...this.state.formError,
              VisitingDateErr: 'Already taken'
            }
          })
          this.state.formValid.VisitingDate = false;
        }
        else {
          this.setState({
            formError: {
              ...this.state.formError,
              VisitingDateErr: ''
            }
          })
          this.state.formValid.VisitingDate = true;
          this.CheckDate(value);
        }
      }

    };
    this.state.formValid.buttonActive =
      this.state.formValid.custName &&
      this.state.formValid.emailId &&
      this.state.formValid.phoneNo &&
      this.state.formValid.pancard && this.state.formValid.VisitingDate

  }
  CheckData = (val) => {
    this.state.arrayData.map((vl, index) => {
      if (vl.emailId === val) {
        console.log("Email is already registered!!");

      }
    })
  }
  CheckDate = (val) => {
    this.state.arrayData.map((vl, index) => {
      if (vl.VisitingDate === val) {
        this.setState({
          formError:{
            ...this.state.formError,
            VisitingDateErr:"date is already taken"
          }
        })
        this.state.formValid.VisitingDate=false;
      }
    })
    return this.res;
  }
  //handle change for input
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      formdata: {
        ...this.state.formdata,
        [name]: value
      }
    })
    this.validateField(name, value);
    console.log(this.state.formdata);
  };


  formSubmit = async (formObj) => {
    try {
      const isAuthenticated = await authenticate(
        formObj.emailId,
      );
      if (isAuthenticated) {

        this.setState({
          successMessage: "Login Successfull",
          errMessage: ''
        });

        setTimeout(() => this.props.history.push("/home"), 1500);


      } else {
        this.setState({
          errMessage: "Invalid username or password!",
          successMessage: ""
        }
        );
      }
    } catch (error) {
      this.setState({
        errMessage: error.message,
        successMessage: ""
      }
      );
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5500/bookings", this.state.formdata).then((response) => {
      this.setState({
        successMessage: `An appointment is booked successfully`,
      })
    }).catch((err) => {
      console.log(err.message + "Error!!Data is not added")
    })
  };

  getData = (e) => {
    axios.get("http://localhost:5500/bookings").then((response) => {
      this.setState({
         arrayData: response.data
      })
    }).catch((err) => {
      console.log(err.message + "Error!!Data is not added")
    })
  }

//      userdata=(e)=>
//   {
    
// axios.get("http://localhost:5500/userDb").then((response)=>{
//       this.setState({
//         arrayData:response.data
//       })
//       console.log(this.state.arrayData)
//     }).catch((err)=>{
//       console.log(err.message +"Error!!Data is not added")
//     })
//   };
 
  componentDidMount(){
    this.getData();
    // this.userdata()
  }

  checkdet = (p) => {
    this.state.arrayData.map((one, index) => {
      if (one.propertyId === p) {
        this.pus = 1;
      }
    })
    return this.pus;
  }
  // userdet = (q) => {
  //   this.state.arrayData.map((val, index) => {
  //     if (val.emailId === q) {
  //       this.pus = 1;
  //     }
  //   })
  //   return this.pus;
  // }
  render() {
    if (this.checkdet(this.props.match.params.propertyId) == 1) {
      return (<div>
        <Grid item md={12} style={{ marginTop: "4%", paddingLeft: "25%", paddingRight: "25%" }}>
          <Card >
            <CardContent>
              <Typography variant="h4" style={{ textAlignment: "center", color: "red" }} display="block" color="textPrimary">
                {<Error severity="error" style={{ color: "blue" }}></Error>} <br></br> You have already booked the visit-explore other properties to book a visit!!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </div>

      )
    }
     else
    //  if (this.userdet(this.props.match.params.emailId) == 0)
    {
      const { classes } = this.props;

      return (
        (

          <Container
            component="main"
            maxWidth="xs"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <HouseOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Book a Visit
              </Typography>
              <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="propertyId"
                  label="Property Id"
                  name="propertyId"
                  autoComplete="propertyId"
                  value={this.state.formdata.propertyId}
                  disabled
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="propertyType"
                  label="Property Type"
                  name="propertyType"
                  autoComplete="propertyType"
                  value={this.state.formdata.propertyType}
                  disabled
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="custName"
                  label="Name"
                  name="custName"
                  autoComplete="custName"
                  value={this.state.formdata.custName}
                  autofocus
                  onChange={this.handleChange}
                  helperText={this.state.formError.custNameErr}
                  error={this.state.formError.custNameErr ? true : false}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phoneNo"
                  label="Mobile No"
                  name="phoneNo"
                  autoComplete="phoneNo"
                  value={this.state.formdata.phoneNo}
                  onChange={this.handleChange}
                  helperText={this.state.formError.phoneNoErr}
                  error={this.state.formError.phoneNoErr ? true : false}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="emailId"
                  label="Email Address"
                  name="emailId"
                  autoComplete="emailId"
                  value={this.state.formdata.emailId}
                  autofocus
                  onChange={this.handleChange}
                  helperText={this.state.formError.emailErr}
                  error={this.state.formError.emailErr ? true : false}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="pancard"
                  label="Pancard no"
                  type="text"
                  id="pancard"
                  value={this.state.formdata.pancard}
                  autoComplete="pancard"
                  onChange={this.handleChange}
                  helperText={this.state.formError.pancardErr}
                  error={this.state.formError.pancardErr ? true : false}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="VisitingDate"
                  type="date"
                  label="Visiting Date"
                  name="VisitingDate"
                  autoComplete="VisitingDate"
                  value={this.state.formdata.VisitingDate}

                  onChange={this.handleChange}
                  helperText={this.state.formError.VisitingDateErr}
                  error={this.state.formError.VisitingDateErr ? true : false}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!(this.state.formError.emailErr === "" && this.state.formError.VisitingDateErr === "" && this.state.formError.custNameErr === "" && this.state.formError.pancardErr === "" && this.state.formError.phoneNoErr === "" && this.state.formValid.buttonActive)}
                >
                  Book
                </Button>
                <Snackbar
                  open={this.state.successMessage ? true : false}
                  message={this.state.successMessage}
                  action={
                    <React.Fragment>
                      <Button
                        color="secondary"
                        size="small"
                        onClick={(e) => this.setState({ successMessage: "" })}
                      >
                        OK
                      </Button>
                    </React.Fragment>
                  }
                ></Snackbar>
                <Snackbar
                  open={this.state.errMessage ? true : false}
                  message={this.state.errMessage}
                  action={
                    <React.Fragment>
                      <Button
                        color="secondary"
                        size="small"
                        onClick={(e) => this.setState({ errMessage: "" })}
                      >
                        OK
                      </Button>
                    </React.Fragment>
                  }
                ></Snackbar>
              </form>

            </div>
            <Box mt={8}></Box>
          </Container>
        )
      )
    }
  }
}
export default withStyles(useStyles)(Book);