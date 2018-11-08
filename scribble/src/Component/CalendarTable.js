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
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(date, place, time, avalible) {
  id += 1;
  return { id, date, place, time, avalible };
}

var dumArr=[1,2,3,4,5,6,7];

function CalendarEvents(props){
    const someEvents = dumArr.map((dum)=>
        <CalendarEvent></CalendarEvent>
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
  let rows = []
  for (var i in userData.options) {
    rows.push(createData(
                          userData.options[i].date,
                          userData.options[i].location,
                          userData.options[i].time,
                          userData.options[i].avalible
                        ));
  } 


    return(
        <CalendarEvents/>
  );
}

CalendarTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarTable);
