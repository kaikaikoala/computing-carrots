import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
  },
};

function ScribbleHeader(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h1" align='center'gutterBottom>
        Scribble
      </Typography>
      <Typography  variant="h5" align='center'gutterBottom>
        Poll, Schedule, Connect
      </Typography>
    </div>
  );
}

/*
Types.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/

export default withStyles(styles)(ScribbleHeader);
