import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
const styles = theme => ({

});

    var numbers=[['time1','people: 5','Kaishin, Juhsep, Kaori, Shark, you'],
        ['time2','people: 3','Hello, julie, animals'],
        ['time3','people: 7','kumi, stop, a, talkin, you, agree, Thank you']
    ];

class SimplePopover extends React.Component {

    constructor(props){
        super(props);
        this.state={
            value:null,
        };
    }

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

    render(){
        const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

        return(
        <Grid container spacing = {0}>
            <Grid item xs={4}><Typography variant="h6">{this.props.number[0]}</Typography></Grid>
            <Grid item xs={7}>
        <Typography variant="h6">{this.props.number[1]}</Typography>
        <Hidden xsDown><Typography paragraph>{this.props.number[2]}</Typography></Hidden>
            </Grid>
            <Grid item xs={1}>
            <IconButton
        aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
              <MoreVertIcon />
            </IconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
        >
            <List>
          <ListItem button>Mark as Available</ListItem>
          <ListItem button>Mark as Unavailable</ListItem>
            </List>
        </Popover>
            </Grid>
        </Grid>

        );
    }
}

function GridTest(props){
    const listItems = numbers.map((number)=>
        <SimplePopover number={number} />
    );
    return(
        <div>
        {listItems}
        </div>
    );
}

class EventPolling extends React.Component {
    render() {
        return(
            <div>
            <GridTest/>
            </div>
        );
    }
}

EventPolling.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EventPolling);
