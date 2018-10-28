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

  componentDidUpdate(prevProps) {
    var dom = this.props.google.maps.event.addDomListener;
    var elementDiv = Document.querySelector('#sectionMap > div > div.map > div > div > div > div > div.gm-err-message');
    // Typical usage (don't forget to compare props):
    if(this.props.AppData.error_gm_Aurth === prevProps.AppData.error_gm_Aurth) {
      console.log(dom);
      console.log(elementDiv);
      console.log(this.props);
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


  
  render() {
    console.dir(this.props)
// make sure there is a map or say sorry :)
    if(this.props.google.maps === undefined) {
      return ( <h2>Sorry error getting google map try to reload the page</h2> );
    }else{
      return (
        {LoadingContainer}
      )
    }
    
  }
}

const LoadingContainer = (props) => (
  <Map google={props.google} 
        className={'map'}
        initialCenter={{
          lat: 53.540203, lng: -2.102056 
        }}
        zoom={12}
        onClick={this.onMapClicked} >
  
        {props.AppData.query !== '' ? // dispaly filtered list and Marker
        props.venue.map((current, index, array) => (
        
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
          animation={props.AppData.listActive ? (props.AppData.listTargetIndex === index ? '1' : '0') : '0'} /> 
          ))
          
          : // display start and all maerkers
          props.start.map((current, index, array) => (
        
        <Marker 
          id={index}
          className={'marker'}
          key={index + 241242 + index} 
          onClick={props.clicked}
          name={current.venue.name}
          title={array[index].venue.location.address}
          position={{
            lat: current.venue.location.lat, lng: current.venue.location.lng
          }}// if clicked test index against listTargetIndex
          animation={props.AppData.listActive ? (props.AppData.listTargetIndex === index ? '1' : '0') : '0'} />       
          )) }
      </Map>
).then(() => {
  if(this.props.google)
})

export default GoogleApiWrapper(
  () => ({
    apiKey: ("AIzaSyDcheCgHTyf9zr3vcCCSOo0wrq_W95sUcA"),
    LoadingContainer: LoadingContainer
  }
))(MapContainer)

MapContainer.propTypes = {
  Map: PropTypes.object,
  Marker: PropTypes.object,
  onMarkerClick: PropTypes.func
};