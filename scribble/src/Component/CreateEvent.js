import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
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
        <Button variant = "fab" color ="primary" className={classes.button} onClick={this.handleOpen}>
        <AddIcon />
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
        
        <div style={getModalStyle()} className={classes.paper}>
        <Typography component="h1" variant="h5">
              Create Your Event!
            </Typography>
          <TextField id="event-name"
          label="Event Name"
          className={classes.inputField}
          onChange={this.handleChange('eventName')}
          margin="normal"
          />
          <br />
          <TextField id="description"
          label="Description of Event"
          className={classes.inputField}
          value={this.state.name}
          onChange={this.handleChange('description')}
          margin="normal" 
          />
          <br />
          <TextField id="location"
          label="Location"
          className={classes.inputField}
          onChange={this.handleChange('location')}
          margin="normal" 
          />
          <TextField id="invites"
          label="Invites"
          className={classes.inputField}
          onChange={this.handleChange('invites')}
          margin="normal" 
          />
          <br />
          <form>
          <TextField
          id="date"
          label="Start"
          type="date"
          className={classes.textField}
          onChange={this.handleChange("startDate")}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </form>
        <form>
          <TextField
          id="date"
          label="End"
          type="date"
          className={classes.textField}
          onChange={this.handleChange("endDate")}
          InputLabelProps={{
            shrink: true,
          }}
        />
        </form>
        <br />
          <Button 
          variant="contained"
          label="Submit"
          onClick={() => {
            // we cant use this.state inside so we make the variables here
            let eventID = '';
            let invites = this.state.invites;
            let emails = invites.split(' ');
            let startDate = this.state.startDate;
            let endDate = this.state.endDate;

            // all the logic to add events handles here
            firebaseInterface.addEvent(this.state.eventName, this.state.description)
            .then(function(eventDocID) {

              eventID = eventDocID;

              console.log("Split emails :", emails);
                
              return firebaseInterface.inviteUsers(eventID, emails);
        
            }).then(function(){

              console.log("Start date:", startDate);
              console.log("End data:", endDate);

              const start = new Date(startDate);
              const end = new Date(endDate);
              const days = (end - start) / 1000 / 60 / 60 / 24;

              let timesToAdd = [];
              for (let i = 0; i <= days + 1; i++) { 
                  const dateTime = new Date(start.getTime() + (i + 1) * 86400000);
                  timesToAdd.push(firebaseInterface.addTime(eventID, dateTime));
              }
        
              Promise.all(timesToAdd);
            }).then(function(){

              this.state.docID = '';
              console.log("database update complete");
        
            })
            .catch(function(error) {

              console.error("Error: ", error);
        
            });
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
