import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import * as firebaseInterface from '../firebaseInterface.js';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root:{
    padding: theme.spacing.unit * 4,
  },

  panel: {
    width: '90%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  inputField: {
      width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    right: 20,
    bottom: 20,
    position: 'fixed',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },

  
});

function getCenterStyles() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class DisplayProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      firstName: '',
      lastName: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log(this.props.first);
      
    return (
        
      <div  className={classes.root}>
        <Typography component="h1" variant="h4" gutterBottom>
              Profile 
            </Typography>
      <Grid container>
        <Grid item xs={4} sm={3}>
          <Typography component="h4" variant="p"gutterBottom>
           First Name: 
         </Typography>
        </Grid>
        <Grid item xs={7} sm={8}>
          <Typography component="p" variant="p"gutterBottom>
            {this.props.first}
         </Typography>
        </Grid>

        <Grid item xs={4} sm={3}>
        <Typography component="h4" variant="p"gutterBottom>
          Last Name: 
        </Typography>
        </Grid>
        <Grid item xs={7} sm={8}>
          <Typography component="p" variant="p"gutterBottom>
            {this.props.last}
         </Typography>
        </Grid>

        <Grid item xs={4} sm={3}>
        <Typography component="h4" variant="p"gutterBottom>
          Email: 
        </Typography>
        </Grid>
        <Grid item xs={7} sm={8}>
        <Typography component="p" variant="p"gutterBottom>
          {this.props.email}
        </Typography>
        </Grid>

      </Grid>
        </div>
    );
  }
}

DisplayProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (DisplayProfile);
