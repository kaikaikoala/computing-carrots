import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Contacts from '../Contacts';
import Calendar from '../Calendar';
import Add from '../Add';


import{
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          <Link to="/">
           Scribble 
          </Link>
          </Typography>
          <Button
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
            <Link to="/Contacts"></Link>
                Contacts
          </Button>
          <Button
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
            <Link to="/Calendar"></Link>
                Calendar
          </Button>
          <Button
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
            <Link to="/Add"></Link>
                Add
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
