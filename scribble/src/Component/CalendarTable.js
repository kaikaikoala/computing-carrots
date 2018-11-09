import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CalendarEvent from './CalendarEvent';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

var dumArr=[1,2,3,4,5,6,7];

function CalendarEvents(props){
  const { classes } = props;
    const someEvents = props.events.map((myEvent)=>
        <CalendarEvent
            addAttendee={()=>props.addAttendee()}
            removeAttendee={()=>props.removeAttendee()}
            userEvent={myEvent}
        />
    );
    return(
        <div>{someEvents}</div>
    );
}


function CalendarTable(props) {
  const { classes } = props;

  // this will eventually actually be the users data
  // right now its just taken directly from a dummy event
  // also we only use the name and description right now because TableCells...
  var userData = props.userData;

  console.log(userData.options);

  // take our data and make it avalible to the TableCells

    return(
        <CalendarEvents
            events={props.events}
            addAttendee={()=>props.addAttendee()}
            removeAttendee={()=>props.removeAttendee()}
        />
  );
}

CalendarTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarTable);
