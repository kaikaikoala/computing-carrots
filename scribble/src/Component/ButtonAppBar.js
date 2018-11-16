import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Settings from '@material-ui/icons/Settings';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';


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
const ProfileLink= props =><Link to="/Profile" {...props}/>
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
                <Hidden smUp><AccountCircle/></Hidden>
                <Hidden xsDown>Contacts</Hidden>
          </Button>
          <Button
                component={CalendarLink}
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
                <Hidden xsDown>Calendar</Hidden>
                <Hidden smUp><CalendarToday/></Hidden>
          </Button>
          <Button
                component={ProfileLink}
                type="button"
                variant="text"
                color="inherit"
                className={classes.signIn}
                onClick={() => {}}
          >
               <Hidden xsDown>Profile</Hidden> 
               <Hidden smUp><Settings/></Hidden>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired
};

export default compose(withStyles(styles),withWidth())(ButtonAppBar);
