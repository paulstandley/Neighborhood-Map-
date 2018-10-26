import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapDisplay from './MapDisplay';
import './index.css';
import './App.css';
/* https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror */



export class MapContainer extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      showingactiveMarker: false 
    };
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingactiveMarker: true,
      showingInfoWindow: true
    });
  }
  
  errorHandeling() {
    
    if(this.props.google.maps !== undefined) {
      const gm_autErr = `This page didn't load Google Maps correctly. See the JavaScript console for technical details.`;
      const domEle = document.querySelector('#sectionMap > div > div.map > div > div > div > div > div.gm-err-message');
      if(domEle === gm_autErr) {
        // need to put this in a life scecel 
        alert("What");
      }
      
    }

    if(this.props.google.maps === undefined) {
// get the dom element test to see if error then display my message
    const domEle = document.querySelector('#sectionMap > div > div.map > div > div > div');
    console.log(domEle);
    console.dir(domEle);

    const domLis = this.props.google.maps.event.addDomListener(window, 'onChange', (evt) => {
      console.log(evt);
    });
    console.dir(domLis);
    
    
    }
    // addDomListener(instance:Object, eventName:string, handler:Function)
  }

  render() {
    console.dir(this.props.google.maps.event.addDomListener)
// make sure there is a map or say sorry :)

    //Map.domLis(instance:Object, eventName:string, handler:Function)
    if(this.props.google.maps === undefined) {
      return ( <h2>Sorry error getting google map try to reload the page</h2> );
    }else{
      
      return ( 
        <MapDisplay dataMap={this.props}/>
      )
    }
    
  }

}


 
export default GoogleApiWrapper(
  () => ({
    apiKey: ("AIzaSyDcheCgHTyf9zr3vcCCSOo0wrq_W95sUcA"),
  
  }
))(MapContainer)

MapContainer.propTypes = {
  Map: PropTypes.object,
  Marker: PropTypes.object,
  onMarkerClick: PropTypes.func
};