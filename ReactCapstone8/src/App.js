import React, { Component } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Explore from "./components/Explorenav";
import register from "./components/Register"
import Profile from "./components/Profile";
import Book from "./components/Book";
import Wishlist from "./components/Wishlist"
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom";
import {
  Box,
  Container,
  withStyles,
} from "@material-ui/core";
import ViewDetails from "./components/ViewDetails";


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 3,
    color: "#FFFFFF"
  },
});



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged_user: sessionStorage.getItem("user"),
      dialog_visible: false,
      logged_out: false
    };
  }
  onClick = () => {
    this.setState({ dialog_visible: true });
  };
  onHide = () => {
    this.setState({ dialog_visible: false });
  }

  logout = () => {
    if (window.confirm("Do you want to logout!!")) {
      let baseURL = "http://localhost:3000"
      this.setState({ dialog_visible: false });
      sessionStorage.clear();
      this.setState({ logged_out: true });
      window.location.href = baseURL;
    }
  };

  confirm_logout = () => {
    this.setState({ dialog_visible: true });
  };
  refrresh = () => {
    window.location.href = "http://localhost:3000/home";
    window.location.href = "http://localhost:3000/explore";
  }

  render() {
    console.log(sessionStorage.getItem('useremail'));
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Button component={Link} to={"/home"}>
                <Typography variant="h6" className={classes.title}>
                  INFY MANSIONS
                </Typography>
              </Button>

              <Button component={Link} to={"/explore"} onClick={() => { this.refrresh() }} style={{ color: "#FFFFFF" }}>
                Explore
              </Button>


              {this.state.logged_user ? (
                <span style={{ marginLeft: "52%" }} className="float-left">
                  {/* Welcome <Link className="nav-link" to="/profile">{this.state.logged_user}</Link> */}
                  <Button component={Link} to={"/profile"} style={{ color: "#FFFFFF", marginLeft: "auto" }}>
                    Welcome {this.state.logged_user}
                  </Button>
                </span>
              ) : null}

              {!this.state.logged_user ? (
                <Button component={Link} to={"/login"} style={{ color: "#FFFFFF", marginLeft: "auto" }}>
                  Login
                </Button>
              ) : null}

              {this.state.logged_user ? (
                <span className="nav-item" style={{ marginLeft: "auto" }}>
                  <Button component={Link} to={"/wishlist"} style={{ color: "#FFFFFF", marginLeft: "auto" }}>
                    Wishlist
                  </Button>
                </span>
              ) : null}

              {this.state.logged_user ? (
                <span className="nav-item" style={{ marginLeft: "auto" }}>
                  <Button component={Link} to={""} onClick={this.logout} style={{ color: "#FFFFFF", marginLeft: "auto" }}>
                    Logout
                  </Button>
                </span>
              ) : null}


              {/* <Box spacing={10} style={{ marginLeft: "auto" }}>
               
                  <Button component={Link} to={"/login"} style={{color:"#FFFFFF"}}>
                    
                  </Button>
             
              </Box> */}
            </Toolbar>
          </AppBar>
          <Container>

            <Switch>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/explore/:propertyId" component={ViewDetails}></Route>
              <Route exact path="/register" component={register} />
              <Route exact path='/book/:propertyId/:ageOfProperty' component={Book}></Route>
              <Route exact path="/wishlist" component={Wishlist}/>
              <Route exact path="/profile" component={Profile} />
              <Route path="*" component={Home}></Route>
            </Switch>
          </Container>

          <Footer></Footer>
        </Router>
      </div>
    );
  }
}

export default withStyles(useStyles)(App);

