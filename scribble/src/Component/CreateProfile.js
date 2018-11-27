import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Location from './Location';
import * as firebaseInterface from '../firebaseInterface.js';

const styles = theme => ({
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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



class CreateEvent extends React.Component {
  state = {
    open: false,
    first: this.props.first,
    last: this.props.last,
    email:this.props.email, 
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    console.log(this.state.first);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
      
    return (
      <div>
        <Button variant = "fab" color ="primary" className={classes.button} onClick={this.handleOpen}>
          <Icon>edit_icon</Icon>
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
        
        <div style={getModalStyle()} className={classes.paper}>
      <form>
          <TextField id="first-name"
          label="First Name"
          className={classes.inputField}
          value={this.state.first}
          onChange={this.handleChange('first')}
          margin="normal"
          />
          <br />
          <TextField id="last-name"
          label="Last Name"
          className={classes.inputField}
          value={this.state.last}
          onChange={this.handleChange('last')}
          margin="normal" 
          />
          <TextField id="email"
          label="Email"
          className={classes.inputField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal" 
          />
      </form>
        
          <Button 
          variant="contained"
          label="Submit"
          onClick={(first,last,email) => {
            this.setState({ open: false });
            this.props.edit( this.state.first, this.state.last, this.state.email);
            // we cant use this.state inside so we make the variables here
          }}
          >
            Submit
          </Button>
        </div>

        </Modal>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (CreateEvent);
