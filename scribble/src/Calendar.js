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
});

class Calendar extends Component{
  state = {
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

    console.log("this is the thing: ", firebase.auth().currentUser);

    // get our calender data
    firebaseInterface.firebaseGetCalendar().then(function(data) {

      // console.log(events);
      component.setState({ userData: data });

      return firebaseInterface.addEvent();

    })
    
    // .then(function(docID) {

    //   sharedDocID = docID;

    //   const emailArray = ["example1@example.com", "example2@example.com", "example3@example.com"];

    //   return firebaseInterface.inviteUsers(sharedDocID, emailArray);

    // }).then(function(){

    //   return firebaseInterface.addTime(sharedDocID, 'December 17, 1995 03:24:00');

    // }).then(function(){

    //   console.log("database update complete");

    // })
    
    .catch(function(error) {

      console.error("Error: ", error);

    });




  }

  render() {

    const { classes } = this.props;
    const { value } = this.state;

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
      {value === 'going' && <TabContainer><CalendarTable
        userData = {this.state.userData}
      ></CalendarTable></TabContainer>}
      {value === 'invite' && <TabContainer>Invite</TabContainer>}
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
