import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import{
  Link,
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
const CalendarLink= props =><Link to="/Calendar" {...props}/>
const AddLink= props =><Link to="/Add" {...props}/>
const ContactsLink= props =><Link to="/Contacts" {...props}/>
const HomeLink= props =><Link to="/" {...props}/>

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          <Button
                component={HomeLink}
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
            Scribble
          </Button>
          </Typography>
          <Button
                component={ContactsLink}
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
                Contacts
          </Button>
          <Button
                component={CalendarLink}
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
                Calendar
          </Button>
          <Button
                component={AddLink}
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
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
