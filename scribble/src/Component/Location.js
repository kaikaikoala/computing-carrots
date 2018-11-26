import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import GoogleMapLoader from "react-google-maps-loader";
import TextField from '@material-ui/core/TextField';
import GooglePlacesSuggest from "react-google-places-suggest";
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import LocationOn from '@material-ui/icons/LocationOn';
import GoogleMapReact from 'google-map-react';
import * as firebaseInterface from '../firebaseInterface.js';
import { compose, withStateHandlers } from "recompose";
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import Geocode from "react-geocode";
const API_KEY = "AIzaSyCljSNy09WuXxS03xSxE10NrpHayfkfeSQ"
Geocode.setApiKey("AIzaSyCljSNy09WuXxS03xSxE10NrpHayfkfeSQ");
Geocode.enableDebug();

var Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null,
        lat: 33.953350,
        lng: -117.396156,
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => ({
            markerPosition: e.latLng,
            lat: mainLat,
            lng: mainLng,
            isMarkerShown:true,
            center: e.latLng,
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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${50}%`,
    left: `${70}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const styles = theme => ({
  panel: {
    width: '90%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  inputField: {
      width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
  },
  
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
    root: {
    height: 180,
  },
});

var mainLat = 33.953350;
var mainLng = -117.396156;

class Location extends React.Component {
  state = {
    open: false,
    search: "",
    value: "",
    center: [33.953350, -117.396156],
    zoom: 9,
    draggable: true,
    lat: 33.953350,
    lng: -117.396156,
    checked: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleInputChange(e) {
    this.setState({search: e.target.value, value: e.target.value})
  };

  handleSelectSuggest(suggest) {
    this.setState({search: "", value: suggest.formatted_address})
    Geocode.fromAddress(suggest.formatted_address).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    mainLat = lat;
    mainLng = lng;
  },
  error => {
    console.error(error);
  }
);
  };

UNSAFE_componentWillReceiveProps() {
    this.forceUpdate();
}

  render() {
    const {search, value} = this.state
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { checked } = this.state;
    
    return (
      <div>
        <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{input: search}}
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest.bind(this)}
              >
                <TextField className={classes.inputField}
                  type="text"
                  value={value}
                  placeholder="Event Location or Toggle for Map"
                  onChange={this.handleInputChange.bind(this)}
                />
                      
              <Switch checked={checked} onChange={this.handleChange} aria-label="Collapse" />
                <Collapse in={checked}>
                  <Paper elevation={10} className={classes.paper}>
        
                    <div style={{ height: '100%' }}>
                        <Map
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCljSNy09WuXxS03xSxE10NrpHayfkfeSQ"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            lat ={mainLat}
                            lng ={mainLng}
                            
                        />
                                
                    </div>
        
                  </Paper>
                </Collapse>        
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />

      </div>
    );
  }
}

Location.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (Location);