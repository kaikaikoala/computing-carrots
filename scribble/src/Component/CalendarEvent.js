import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventPolling from './EventPolling';
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
  card: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class CalendarEvent extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
            

  render() {
      
    const { classes } = this.props;
      var myInvites = this.props.userEvent.invited;
        var myDate={attend:0,date:'TBD'} ;
        for( var i=0 ; i<this.props.userEvent.dates.length;++i){
            var attend = 0 ;
            for( var j=0;j<this.props.userEvent.dates[i].avalibility.length;++j){
                if( this.props.userEvent.dates[i].avalibility[j][myInvites[j]] == true ){
                    attend+=1;
                } 
            }
            if( myDate.attend < attend){
                myDate.attend = attend;
                myDate.date = this.props.userEvent.dates[i].date.toDate();
            }

        }
      var mySubheader="Date: "+myDate.date
          +" Attendance: "+myDate.attend;
      var iterator = this.props.userEvent.dates.keys();

      return (
          <Card className={classes.card}>
          <CardHeader
          title={this.props.userEvent.name}
          subheader = {mySubheader}
          />
          <CardContent>
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

          <Typography component="p">
          {this.props.userEvent.desccription}
          </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
          className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
          })}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="Show more"
          >
          <ExpandMoreIcon />
          </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <EventPolling
          addAttendee={()=>this.props.addAttendee()} 
          removeAttendee={()=>this.props.removeAttendee()} 
          dates={this.props.userEvent.dates}
          />
          </CardContent>
          </Collapse>
          </Card>
      );
  }
}

CalendarEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CalendarEvent);
