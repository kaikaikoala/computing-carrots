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
    firebaseInterface.firebaseGetCalendar().then((data) => {
      this.setState({ userData: data });
      // we call addEvent which returns a promise
      // if the event is added successfully, we get the document ID
      firebaseInterface.addEvent().then((docID) => {
        // now that we have the document ID of the event, we can add any times and invites we want.
        firebaseInterface.addTime(docID, 'December 17, 1995 03:24:00')
        firebaseInterface.inviteUsers(docID, ["example1@example.com", "example2@example.com", "example3@example.com"]);
      });
    }, (error) => {
      console.log("woops")
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
