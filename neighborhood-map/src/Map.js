import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './index.css';
import './App.css';

const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
 

  state = {
    selectedPlace: ["Helow map"]
  }

  onMapClicked = (evt) => {
    console.log(evt);
    
  }

  onMarkerClick = (evt) => {
    console.log(evt);
  }

  onInfoWindowClose = (evt) => {
    console.log(evt);
  }
  
  render() {
  
    return (
      <Map google={this.props.google} 
      style={style}
          initialCenter={{
            lat: 53.540203, lng: -2.117056 
          }}
          zoom={15}
          onClick={this.onMapClicked} >
 
      {this.props.venue !== undefined ? this.props.venue.map((current, index, array) => (
        
        <Marker key={index} onClick={this.onMarkerClick}
        name={current.venue.name}
        position={{
          lat: current.venue.location.lat, lng: current.venue.location.lng
        }} 
        />
/*
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{current.venue.name}</h1>
          </div>
        </InfoWindow>
        */
      )) :  '' /* (
        <Marker onClick={this.onMarkerClick}
        name={this.state.selectedPlace.name} />
      ) */}
        
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