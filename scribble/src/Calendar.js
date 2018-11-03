import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import CalendarTable from './Component/CalendarTable';
import firebase from './firebase.js';
import * as firebaseInterface from './firebaseInterface.js';

class Calendar extends Component{
  state = {
    userData: '',
  }

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
    return(
      <div>
      <ButtonAppBar></ButtonAppBar>
      <ScribbleHeader></ScribbleHeader>
      <h1>Calendar</h1>
      <CalendarTable
        userData = {this.state.userData}
      ></CalendarTable>
      </div>
    );
  }
}
export default Calendar;
