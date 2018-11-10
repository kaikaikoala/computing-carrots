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

function NameList(props){
        var invited=[] ;
        for( var i =0 ; i<props.date.avalibility.length; ++i){
            invited[i]= Object.keys(props.date.avalibility[i]) ;
        }
    var attend=[]
        for( var i=0;i<props.date.avalibility.length;i++){
            if( props.date.avalibility[i][invited[i]] == true){
                attend.push( invited[i] );
            }
        }
    const names = attend.map((name)=>
        <Typography>
            {name}
        </Typography>
    );
    return(
        <div>
        {names}
        </div>
    );
}

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

        var attend = 0 ;
        var invited=[] ;
        for( var i =0 ; i<this.props.date.avalibility.length; ++i){
            invited[i]= Object.keys(this.props.date.avalibility[i]) ;
        }
        for( var i=0;i<this.props.date.avalibility.length;i++){
            if( this.props.date.avalibility[i][invited[i]] == true){
                attend++;
            }
        }
        var displayDate = this.props.date.date.toDate(); 
        return(
        <Grid container spacing = {0}>
            <Grid item xs={4}><Typography variant="h6">{displayDate.toDateString()}</Typography></Grid>
            <Grid item xs={7}>
        <Typography variant="h6">{attend}</Typography>
        <Hidden xsDown><NameList date = {this.props.date}/></Hidden>
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
          <ListItem button onClick={()=>this.props.addAttendee()}>Mark as Available</ListItem>
          <ListItem button onClick={()=>this.props.removeAttendee()}>Mark as Unavailable</ListItem>
            </List>
        </Popover>
            </Grid>
        </Grid>

        );
    }
}

function GridTest(props){
    const listItems = props.dates.map((myDate)=>
        <SimplePopover 
                date={myDate} 
                addAttendee={()=>props.addAttendee()}
                removeAttendee={()=>props.removeAttendee()}
        />
    );
    return(
        <div>
        {listItems}
        </div>
    );
}

class EventPolling extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div>
            <GridTest
                addAttendee={()=>this.props.addAttendee()}
                removeAttendee={()=>this.props.removeAttendee()}
                dates = {this.props.dates}
            />
            </div>
        );
    }
}

EventPolling.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EventPolling);
