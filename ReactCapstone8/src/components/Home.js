import React from "react";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Container, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding:'10',
    marginTop:'5%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding:15,
    
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
});


class Home extends React.Component {
  state={
    searchTerm:""
  }
  handleChange=(e)=>{
   this.setState({searchTerm: e.target.value});
  }
  
    render() {
      const {classes}=this.props;
      return(
        <div>
        <Container>
            <Grid container>
                <Grid item xs={false} md={3}></Grid>
                <Grid item xs={12} md={6}>
                <Paper component="form" className={classes.root}>
      
                    <InputBase
                       
                        className={classes.input}
                        onChange={this.handleChange}
                        value={this.state.searchTerm}
                        placeholder="Search for area here"
                        inputProps={{ 'aria-label': 'search area' }}

                    />
                    
                    <Divider className={classes.divider} orientation="vertical" />
                    <Link to={`/explore/?searchTerm=${this.state.searchTerm}`}>
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    </Link>
                </Paper>
                </Grid>
                <Grid item xs={false} md={3}></Grid>

            </Grid>
            <Grid container style={{marginTop:100}}>
              <Grid item xs={false} sm={2}></Grid>
              <Grid item xs={12} sm={10}>
                <Typography style={{color:'whitesmoke'}} variant='h2'>Finding House Made Easy Now..</Typography>
                <Typography style={{color:'whitesmoke'}} variant='h5'>Let's Find your dream house in your dream area at your price.</Typography>
                <Typography style={{color:'whitesmoke'}} variant='h5'>Search for a property and book a visit now!</Typography>

              </Grid>
              <Grid item xs={false} sm={2}></Grid>

            </Grid>
            
        </Container>
        </div>
    )
    }
    
}

export default withStyles(useStyles, { withTheme: true })(Home);