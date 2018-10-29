import React, {Component} from 'react';
import ButtonAppBar from './Component/ButtonAppBar';
import ScribbleHeader from './Component/ScribbleHeader';
import CalendarTable from './Component/CalendarTable';
import firebase from './firebase.js';

function getCalendar() {
  var databaseRef = firebase.database().ref('events/someUniqueEventID');

  return new Promise(function (resolve, reject) {
    databaseRef.on('value', function(snapshot) {
        if (snapshot != null) {
          resolve(snapshot.val())
        } else {
          reject('Something bad happened');
        }
      });
  });
}

class Calendar extends Component{
  state = {
    userData: '',
  }

  componentDidMount() {
    getCalendar().then((data) => {
      this.setState({ userData: data });
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
