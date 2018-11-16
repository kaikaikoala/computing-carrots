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
    <Typography component="div" style={{ padding: 8 * 8 }}>
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

    addAttendee( ){
        alert('add availability');
    }

    removeAttendee( ){
        alert('remove availability');
    }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount() {
    // since we're going to be inside a function, we cant just use this
    // so we first have to get a reference to it to use later
    const component = this;

    //console.log("this is the thing: ", firebase.auth().currentUser);

    // OK SO LIKE IF WE DO THIS DUMMY DATABASE REQUEST AND THEN TRY TO GET THE CURRENT USER
    // IT WORKS FOR SOME REASON SO LET'S JUST DO THIS SHIT FOR NOW I GUESS

    // get our calender data
    firebaseInterface.firebaseGetCalendarDummy().then(function(data) {

      // console.log(events);
      // component.setState({ userData: data });

      //return firebaseInterface.addEvent();
    })
    .then(function() {
      return firebaseInterface.firebaseGetCalendar();
    }).then(function(events) {
      component.state.events = events;
      console.log("events now in this.state.events", component.state.events);
      component.forceUpdate();
    }).catch(function(error) {

      console.error("Error: ", error);

    });
  }

  // componentDidUpdate() {
  //   this.state.events.forEach(element => {
  //     console.log("this is one event: ", element);
  //   });
  // }

  render() {

    const { classes } = this.props;
    const { value } = this.state;
    
    // this.state.events.forEach(element => {
    //   console.log("this is one event: ", element);
    // });

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
        events = {this.state.events}
        userData = {"hello"}
        addAttendee={()=>this.addAttendee()}
        removeAttendee={()=>this.removeAttendee()}
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
