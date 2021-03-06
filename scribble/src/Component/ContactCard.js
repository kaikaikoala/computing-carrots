import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GroupDescription from './GroupDescription';
const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


function ContactCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
        Contact Group
        {/* {props.contacts.group} */}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Group Size
          {/* Group size: {props.contacts.contacts.length} */}
        </Typography>
        <Typography component="p">
          Group Description 
        </Typography>
      </CardContent>
      <CardActions>
        <GroupDescription></GroupDescription>
      </CardActions>
    </Card>
  );
}


ContactCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactCard);
