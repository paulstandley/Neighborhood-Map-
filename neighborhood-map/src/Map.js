import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './index.css';
import './App.css';

const style = {
  width: '100%',
  height: '100%',
  position: 'relative'
}

export class MapContainer extends Component {
 

  state = {
    showingInfoWindow: true,
    activeMarker: {},
    selectedPlace: {},
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onMarkerClick = (props, marker, evt) => {
  console.log(marker)  
  console.log(evt)
  console.log(props)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onInfoWindowClose = (evt) => {
    console.log(evt);
  }
  /*
  onMouseoverMarker = (props, marker, evt) => {
    console.log(evt);
  }
  */
  render() {
     console.log(this.props.venue)
     console.log(this.props.start)
    return (
      <Map google={this.props.google} 
      className={'map'}
      style={style}
          initialCenter={{
            lat: 53.540203, lng: -2.117056 
          }}
          zoom={11}
          onClick={this.onMapClicked} >
 
      {this.props.venue !== undefined ? this.props.venue.map((current, index, array) => (
        
        <Marker 
        className={'marker'}
        key={index + 2020 + index} 
        onClick={this.onMarkerClick}
        //onMouseover={this.onMouseoverMarker}
        name={current.venue.name}
        title={array[index].venue.location.address}
        position={{
          lat: current.venue.location.lat, lng: current.venue.location.lng
        }} />
        
      
      )) : this.props.start.map((current, index, array) => (
        
        <Marker 
        className={'marker'}
        key={index + 2424 + index} 
        onClick={this.onMarkerClick}
        //onMouseover={this.onMouseoverMarker}
        name={current.venue.name}
        title={array[index].venue.location.address}
        position={{
          lat: current.venue.location.lat, lng: current.venue.location.lng
        }} />
        
      
      )) }
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