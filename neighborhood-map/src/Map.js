import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './index.css';

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
 

  state = {
    selectedPlace: ["Helow map"]
  }

  onMarkerClick = (evt) => {
    console.log(evt)
  }

  onInfoWindowClose = (evt) => {
    console.log(evt)
  }
  
  render() {
    return (
      <Map google={this.props.google} 
      zoom={14}
      style={style} >
 
        <Marker onClick={this.onMarkerClick}
                name={this.state.selectedPlace.name} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDcheCgHTyf9zr3vcCCSOo0wrq_W95sUcA")
})(MapContainer)

MapContainer.propTypes = {
  Map: PropTypes.object,
  onMarkerClick: PropTypes.func
};