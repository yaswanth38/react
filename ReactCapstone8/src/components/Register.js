import React, { Component } from "react";
import { Link, } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Snackbar } from "@material-ui/core";
import { authenticate } from "../services/login.service";
import Axios from "axios";
import { Repeat } from "@material-ui/icons";

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


class register extends Component {

  state = {
    formdata: {
      emailId: "",
      name: "",
      mobNo: "",
      password: "",

    },
    formError: {
      emailErr: "",
      nameErr: "",
      mobNoErr: "",
      passErr: "",
    },
    formValid: {
      emailId: false,
      name: false,
      mobNo: false,
      password: false,
      buttonActive: false,
    },
    arrayData: [

    ],


    successMessage: "",
    errMessage: "",
    showPassword: false,
  }

  //validator method for inputs
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
        this.CheckData(value);
      }
    } else if (name === "password") {
      let passRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,20}$/;
      if (!value.match(passRegx)) {
        this.setState({
          formError: {
            ...this.state.formError,
            passErr: "Password should contain atleast one speacial char,numbers,capital and small letter!"
          }
        })
        this.state.formValid.password = false;
      } else {
        this.setState({
          formError: {
            ...this.state.formError,
            passErr: ""
          }
        })
      }
      this.state.formValid.password = true;

    }
    else if (name === "mobNo") {
      let numberRegx = /^[0-9]{10}$/;
      if (!value.match(numberRegx)) {
        this.setState({
          formError: {
            ...this.state.formError,
            mobNoErr: 'only 10 numbers are allowed'
          }
        })
        this.state.formValid.mobNo = false;
      }
      else {
        this.setState({
          formError: {
            ...this.state.formError,
            mobNoErr: ''
          }
        })
        this.state.formValid.mobNo = true;
      }

    }
    else if (name === "name") {
      let nameRegEx = /^[A-Za-z][A-Za-z ]+$/;
      if (!value.match(nameRegEx)) {
        this.setState({
          formError: {
            ...this.state.formError,
            nameErr: 'Enter a valid name'
          }
        })
        this.state.formValid.name = false;
      }
      else {
        this.setState({
          formError: {
            ...this.state.formError,
            nameErr: ''
          }
        })
        this.state.formValid.name = true;
      }

    };
    this.state.formValid.buttonActive =
      this.state.formValid.name &&
      this.state.formValid.emailId &&
      this.state.formValid.mobNo &&
      this.state.formValid.password

  }
  CheckData = (val) => {
    this.state.arrayData.map((vl, index) => {
      if (vl.emailId === val) {
        this.setState({
          formError: {
            ...this.state.formError,
            emailErr: "Email is already registered!!"
          }
        })

        this.state.formValid.emailId = false;
      }
    })
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
  };


  formSubmit = async (formObj) => {
    try {
      const isAuthenticated = await authenticate(
        formObj.emailId,
        formObj.password
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
    Axios.post("http://localhost:5500/register", this.state.formdata).then((response) => {
      console.log("Data Added Successfully")
      this.setState({
        successMessage: `User is registered successfully with email id:${this.state.formdata.emailId}`,
      })
    }).catch((err) => {
      console.log(err.message + "Error!!Data is not added")
    })
  };


  getData = (e) => {

    Axios.get("http://localhost:5500/getemails").then((response) => {
      this.setState({
        arrayData: response.data
      })
      console.log(this.state.arrayData)
    }).catch((err) => {
      console.log(err.message + "Error!!Data is not added")
    })
  };
  componentDidMount() {
    this.getData();
  }

  render() {
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={this.state.formdata.name}
                autoFocus
                onChange={this.handleChange}
                helperText={this.state.formError.nameErr}
                error={this.state.formError.nameErr ? true : false}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mobNo"
                label="Mobile No"
                name="mobNo"
                autoComplete="mobNo"
                value={this.state.formdata.mobNo}
                autoFocus
                onChange={this.handleChange}
                helperText={this.state.formError.mobNoErr}
                error={this.state.formError.mobNoErr ? true : false}
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
                autoFocus
                onChange={this.handleChange}
                helperText={this.state.formError.emailErr}
                error={this.state.formError.emailErr ? true : false}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={this.state.showPassword ? "text" : "password"}
                id="password"
                value={this.state.formdata.password}
                autoComplete="current-password"
                onChange={this.handleChange}
                helperText={this.state.formError.passErr}
                error={this.state.formError.passErr ? true : false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) => this.setState({
                          showPassword: !this.state.showPassword
                        })}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!(this.state.formError.emailErr === "" && this.state.formError.passErr === "" && this.state.formValid.buttonActive)}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to="/Login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>

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
// export default register;
export default withStyles(useStyles)(register);
