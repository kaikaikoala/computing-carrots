import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class ContactList extends React.Component {
  state = {
    dense: false,
    secondary: true,
  };

  render() {
    const { classes } = this.props;
    const { dense, secondary } = this.state;

    return (
      <div className={classes.root}>
        <FormGroup row>
        </FormGroup>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Typography variant="h7" className={classes.title}>
              Member List
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemText
                      primary="Member name"
                      secondary={secondary ? 'member email' : null}
                    />
                  </ListItem>,
                )}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactList);