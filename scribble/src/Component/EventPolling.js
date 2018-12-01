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
import * as firebaseInterface from '../firebaseInterface.js';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { compose, withStateHandlers } from "recompose";
import Geocode from "react-geocode";
const API_KEY = "AIzaSyCljSNy09WuXxS03xSxE10NrpHayfkfeSQ"
Geocode.setApiKey("AIzaSyCljSNy09WuXxS03xSxE10NrpHayfkfeSQ");
Geocode.enableDebug();

var e={lat:33,lng:0,};
var Map = compose(
    withStateHandlers(() => ({
      markerPosition: null,
      lat: e.lat,
      lng: e.lng,
      isMarkerShown:true,
    }), {
        onMapClick: ({ isMarkerShown }) => () => ({
        })
      }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
            onClick={props.onMapClick}
            
        >
            {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }}/> }
     <GoogleMap center={{lat: props.lat, lng: props.lng }}/>
        </GoogleMap>
    )


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

    // HANDLE FIREBASE IN THESE 
    addAttendee(eventID, date) {
        // alert('add availability');
        // console.log("eventID for this: ", eventID);
        // console.log("date for this: ", date);
        firebaseInterface.setAttendeeState(eventID, date, true)
    }

    removeAttendee(eventID, date) {
        // alert('remove availability');
        // console.log("eventID for this: ", eventID);
        // console.log("date for this: ", date);
        firebaseInterface.setAttendeeState(eventID, date, false)
    }

    render(){
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const eventIDRef = this.props.eventID;
        const dateRef = this.props.date;

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
        <Grid container spacing = {8}>
            <Grid item md ={4} xs={6}><Typography variant="h6">{displayDate.toDateString()}</Typography></Grid>
            <Grid item md={7} xs={5}>
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
          <ListItem button onClick={() => {this.props.addAttendee(eventIDRef, dateRef)}}>Mark as Available</ListItem>
          <ListItem button onClick={() => {this.props.removeAttendee(eventIDRef, dateRef)}}>Mark as Unavailable</ListItem>
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
                eventID = {props.eventID}
                addAttendee={(eventID, date)=>props.addAttendee(eventID, date)}
                removeAttendee={(eventID, date)=>props.removeAttendee(eventID, date)}
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
        const { classes } = this.props;

        // NOW WE CAN ADD AND REMOVE ATTENDEES
        console.log("eventID for this is: ", this.props.eventID);
        e.lat = this.props.lat;
        e.lng = this.props.lng;

        return(
            <div>
            <Typography variant="h4">
              Location
            </Typography>
<Paper elevation={5} className={classes.paper}>
        
                    <div style={{ height: '100%' }}>
                        <Map
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCljSNy09WuXxS03xSxE10NrpHayfkfeSQ"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            
                            lat ={33}
                            lng ={-117}
                            
                        />
                                
                    </div>
        
                  </Paper>

          <br/>
          <br/>
            <Typography variant="h4" gutterbottom>
              Attendance 
            </Typography>
            <GridTest
                addAttendee={(eventID, date)=>this.props.addAttendee(eventID, date)}
                removeAttendee={(eventID, date)=>this.props.removeAttendee(eventID, date)}
                dates = {this.props.dates}
                eventID = {this.props.eventID}
            />
            </div>
        );
    }
}

EventPolling.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EventPolling);
