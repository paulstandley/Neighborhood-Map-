import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import './index.css';
import './App.css';
/* https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror */

export class MapContainer extends Component {
 
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    showingactiveMarker: false
  }

  componentDidUpdate() {
    /* manual check not enoght time to redo so boge :( */
      const mapError = window.document.querySelector('#sectionMap > div > div.map > div > div > div > div > div.gm-err-message');
      const errorString = 'This page didn\'t load Google Maps correctly. See the JavaScript console for technical details.';
      console.log(mapError)
      console.log(errorString);
      if(mapError === undefined) {
        if(mapError.innerText === errorString) {
          this.gm_authFailure();
        }
      }
  }
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingactiveMarker: true,
      showingInfoWindow: true
    });
  }

  gm_authFailure(){
    window.alert("Google Maps error!");
  }

  gm_authFailure = () => {
    window.alert("Help my code is pants");
  }

  render() {
    console.dir(this.props.google)
// make sure there is a map or say sorry :)
    if(this.props.google.maps === undefined) {
      return ( <h2>Sorry error getting google map try to reload the page</h2> );
    }else{
      console.log(this.refs);
      
      const mapthing = Map;
      console.log(mapthing);
      return (
        <Map google={this.props.google} 
        className={'map'}
        initialCenter={{
          lat: 53.540203, lng: -2.102056 
        }}
        zoom={12}
        onClick={this.onMapClicked} >
  
        {this.props.AppData.query !== '' ? // dispaly filtered list and Marker
        this.props.venue.map((current, index, array) => (
        
        <Marker 
          id={index}
          className={'marker'}
          key={index + 201203 + index} 
          onClick={this.props.clicked}
          name={current.venue.name}
          title={array[index].venue.location.address}
          position={{
            lat: current.venue.location.lat, lng: current.venue.location.lng
          }}// if clicked test index against listTargetIndex  
          animation={this.props.AppData.listActive ? (this.props.AppData.listTargetIndex === index ? '1' : '0') : '0'} /> 
          ))
          
          : // display start and all maerkers
          this.props.start.map((current, index, array) => (
        
        <Marker 
          id={index}
          className={'marker'}
          key={index + 241242 + index} 
          onClick={this.props.clicked}
          name={current.venue.name}
          title={array[index].venue.location.address}
          position={{
            lat: current.venue.location.lat, lng: current.venue.location.lng
          }}// if clicked test index against listTargetIndex
          animation={this.props.AppData.listActive ? (this.props.AppData.listTargetIndex === index ? '1' : '0') : '0'} />       
          )) }
      </Map>
      )
    }
    
  }
}

export default GoogleApiWrapper(
  () => ({
    apiKey: ("AIzaSyDcheCgHTyf9zr3vcCCSOo0wrq_W95sUcA1")
  }
))(MapContainer)

MapContainer.propTypes = {
  Map: PropTypes.object,
  Marker: PropTypes.object,
  onMarkerClick: PropTypes.func
};