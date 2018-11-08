import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

    /*
  return (
    <Paper className={classes.root}>
      <Typography component="h5" variant="h5" gutterBottom>
        Name: {userData.name}
      </Typography>
      <Typography component="h6" variant="h6" gutterBottom>
        Description: {userData.description}
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Dates</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Avalible?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell string>{row.date}</TableCell>
                <TableCell string>{row.place}</TableCell>
                <TableCell string>{row.time}</TableCell>
                <TableCell string>{row.avalible}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  */
    return(
        <CalendarEvent/>
  );
}

CalendarTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarTable);
