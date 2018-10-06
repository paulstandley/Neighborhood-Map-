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
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    showingactiveMarker: false
  };

  onMapClicked = (props) => {
   
    console.log(props.google.maps.Marker.Mb.setAnimation);
    console.log(props);
    console.log(props.children);
    console.log(props.children[0]);
    console.log(props.children[0].props);
    console.log(props.children[0].props.name);//name ref on map child
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: true,
        activeMarker: null
      })
    }
  };

  onMarkerClick = (props, marker, evt) => {
    //this.props.clicked(evt);
    console.log(marker);
    console.log(marker.name)
    console.log(evt);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingactiveMarker: true,
      showingInfoWindow: true
    });
  }
  /*
  onInfoWindowClose = (evt) => {
    console.log(evt);
    animation={activeMarker ? (item.name === activeMarker.title ? '1' : '0') : '0'}
  }

  onMouseoverMarker = (props, marker, evt) => {
    console.log(evt);
  }
  */
  render() {
    console.dir(this.props);
    if(this.props.AppData !== undefined) {
      console.dir(this.props.AppData.listActiveTargetMarker);
      console.log(this.props.AppData.listActiveTargetName);
    } 
    return (
      <Map google={this.props.google} 
        className={'map'}
        style={style}
        initialCenter={{
          lat: 53.540203, lng: -2.117056 
        }}
        zoom={12}
        onClick={this.onMapClicked} >
 
      {this.props.venue !== undefined ? this.props.venue.map((current, index, array) => (
        
      <Marker 
        className={'marker'}
        key={index + 201203 + index} 
        onClick={this.props.clicked}
        //onMouseover={this.onMouseoverMarker}
        name={current.venue.name}
        title={array[index].venue.location.address}
        position={{
          lat: current.venue.location.lat, lng: current.venue.location.lng
        }} 
        animation={this.props.AppData.listActive ? (array[index].venue.location.address !== this.props.AppData.listActiveTargetAddress ? '0' : '1') : '0'} />
        
      
      )) : this.props.start.map((current, index, array) => (
        
      <Marker 
        className={'marker'}
        key={index + 241242 + index} 
        onClick={this.props.clicked}
        //onMouseover={this.onMouseoverMarker}
        name={current.venue.name}
        title={array[index].venue.location.address}
        position={{
          lat: current.venue.location.lat, lng: current.venue.location.lng
        }}
        animation={this.props.AppData.listActive ? (array[index].venue.location.address !== this.props.AppData.listActiveTargetAddress ? '0' : '1') : '0'} />
        
      
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