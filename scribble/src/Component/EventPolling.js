import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class EventPolling extends React.Component {
  render() {
      return(
          <div>
          not that dumb
          </div>
      );
  }
}

EventPolling.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EventPolling);
