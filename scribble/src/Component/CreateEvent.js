import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

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
        <Button variant = "fab" color ="default" className={classes.button} onClick={this.handleOpen}>
        <AddIcon />
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
        <div style={getModalStyle()} className={classes.paper}>
          <TextField id="event-name"
          label="Event Name"
          className={classes.inputField}
          //onChange={this.handleChange('name')}
          margin="normal"
          />
          <br />
          <TextField id="description"
          label="Description of Event"
          className={classes.inputField}
          //onChange={this.handleChange('name')}
          margin="normal" 
          />
          <br />
          <TextField id="location"
          label="Location"
          className={classes.inputField}
          //onChange={this.handleChange('name')}
          margin="normal" 
          />
          <br />
          <form>
          <TextField
          id="date"
          label="Start"
          type="date"
          className={classes.textField}
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
          InputLabelProps={{
            shrink: true,
          }}
        />
        </form>
        <br />
          <Button variant="contained" label="Submit">
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