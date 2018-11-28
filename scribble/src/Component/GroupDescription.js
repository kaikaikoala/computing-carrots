import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Location from './Location';
import * as firebaseInterface from '../firebaseInterface.js';
import ContactList from './ContactList';

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



class GroupDescription extends React.Component {
  state = {
    open: false,
    eventName: '',
    description: '',
    location: '',
    invites: "",
    startDate: "",
    endDate: "",
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
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
        <Button variant = "small" color ="primary" className={classes.button} onClick={this.handleOpen}>
            Learn More
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
        
        <div style={getModalStyle()} className={classes.paper}>
        <Typography component="h1" variant="h5">
              Group Description
            </Typography>
            <br />
          <b1>
              Name: "Group Name here"
          </b1>
          <br/>
          <br />
          <b1>
              Description: "Group Description here"
          </b1>
          <br />
          <ContactList></ContactList>
          <br />
          <br />
        <br />
        </div>
        </Modal>
      </div>
    );
  }
}

GroupDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (GroupDescription);
