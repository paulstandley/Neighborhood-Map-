import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import './index.css';
import './App.css';

export class MapContainer extends Component {
 
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    showingactiveMarker: false
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
// make sure there is a map or say sorry :)
    if(this.props.google.maps === undefined) {
      return ( <h2>Sorry error getting google map try to reload the page</h2> );
    }else{
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
/* https://review.udacity.com/?utm_campaign=ret_000_auto_ndxxx_submission-reviewed&utm_source=blueshift&utm_medium=email&utm_content=reviewsapp-submission-reviewed&bsft_clkid=02188fcd-3ba8-406c-a97c-4333d5d3fc3c&bsft_uid=ed91580d-4503-417b-b860-9958e533e56f&bsft_mid=d77e17dd-e848-419b-a5f9-2a8bb49f851e&bsft_eid=6f154690-7543-4582-9be7-e397af208dbd&bsft_txnid=12a7661a-afd0-466f-b310-83cb4875cf41#!/reviews/1521496

https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282/58 
https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/ */

export default GoogleApiWrapper(
  () => ({
    apiKey: ("AIzaSyDcheCgHTyf9zr3vcCCSOo0wrq_W95sUcA")
  }
))(MapContainer)

MapContainer.propTypes = {
  Map: PropTypes.object,
  Marker: PropTypes.object,
  onMarkerClick: PropTypes.func
};