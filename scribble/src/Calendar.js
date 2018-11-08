import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import CalendarTable from './Component/CalendarTable';
import firebase from './firebase.js';
import * as firebaseInterface from './firebaseInterface.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CreateEvent from './Component/CreateEvent';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
    right: 20,
    position: 'fixed',
  },
});

class Calendar extends Component{
  state = {
    events: [],
    userData: '',
    value: 'going',
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    // since we're going to be inside a function, we cant just use this
    // so we first have to get a reference to it to use later
    const component = this;
    let sharedDocID;

    //console.log("this is the thing: ", firebase.auth().currentUser);

    // OK SO LIKE IF WE DO THIS DUMMY DATABASE REQUEST AND THEN TRY TO GET THE CURRENT USER
    // IT WORKS FOR SOME REASON SO LET'S JUST DO THIS SHIT FOR NOW I GUESS

    // get our calender data
    firebaseInterface.firebaseGetCalendarDummy().then(function(data) {

      // console.log(events);
      component.setState({ userData: data });

      //return firebaseInterface.addEvent();
    })
    .then(function() {
      return firebaseInterface.firebaseGetCalendar();
      // return firebaseInterface.addEvent();
    }).then(function(events) {
      let eventArray = [];

      events.forEach(element => {
        if (element.data() != null) {
          eventArray.push(element.data());
        }
      });

      component.setState({ events: eventArray });
    }).catch(function(error) {

      console.error("Error: ", error);

    });

    // this is how we'll add users, and add times, ill keep it here for reference
    // .then(function(docID) {

    //   sharedDocID = docID;

    //   const emailArray = ["example1@example.com", "example2@example.com", "example3@example.com"];

    //   return firebaseInterface.inviteUsers(sharedDocID, emailArray);

    // }).then(function(){

    //   return firebaseInterface.addTime(sharedDocID, 'December 17, 1995 03:24:00');

    // }).then(function(){

    //   console.log("database update complete");

    // })




  }

  render() {

    const { classes } = this.props;
    const { value } = this.state;

    console.log("events in state: ", this.state.events);

    return(
      <div className={classes.root}>
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <AppBar position="static">
        <Tabs 
          value={value} 
          onChange={this.handleChange}
          // inkBarStyle = {{background: 'white'}}
          centered
          fullWidth
        >
            <Tab value="going" label="Going" />
            <Tab value="invite" label="Invite" />
        </Tabs>
      </AppBar>
      {value === 'going' && <TabContainer>
        <CalendarTable
        //userData = {this.state.userData}
        //events = {this.state.events}
        userData = {"hello"}
        events = {"hello"}
        >
        </CalendarTable>
        <CreateEvent>
        </CreateEvent>
        </TabContainer>}
      {value === 'invite' && <TabContainer>
        Invite
        </TabContainer>}
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
