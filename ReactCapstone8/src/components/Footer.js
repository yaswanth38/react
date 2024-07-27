import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Grid } from '@material-ui/core';
import reactlogo from '../assets/logo192.png'

function Copyright() {
  return (
    <Typography variant="body1">
      {'Copyright © '}
      <Link color="inherit" href="/home">
        InfyMansions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '30vh',
  },
 
  footer: {
    padding: theme.spacing(2, 2),
    position:'fixed',
    width: '100%',  
    bottom:0,
    backgroundColor:theme.palette.grey.A100
  },
}));

const Footer=()=>{
    const classes=useStyles();
    return (
        <div className={`${classes.root} footer`}>
        <footer className={classes.footer}>
        
            <Grid container style={{textAlign:'center'}}>
                <Grid item xs={12} sm={3} md={4}>
                <Typography variant="body1">ETA-UI-MYS</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                
                <Copyright />
                </Grid>
                <Grid item xs={12} sm={3} md={4}>
                <Typography variant="body1">POWERED BY <img src={reactlogo} width='20px' height="20px"></img>React 16.13.1</Typography>
                </Grid>
            </Grid>
              
            
      
        </footer>
      </div>
    )
}

export default Footer