import React, { Component } from 'react';
import { Map, Marker } from 'google-maps-react';
import './index.css';
import './App.css';

class MapDisplay extends Component {
  state = { 

   }
  render() { 
    console.log(this.props.dataMap)
    return ( 
      <Map google={this.props.google} 
        className={'map'}
        initialCenter={{
          lat: 53.540203, lng: -2.102056 
        }}
        zoom={12}
        onClick={this.onMapClicked} >

        {this.props.dataMap.AppData.query !== '' ? // dispaly filtered list and Marker
        this.props.dataMap.venue.map((current, index, array) => (
        
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
          animation={this.props.dataMap.AppData.listActive ? (this.props.dataMap.AppData.listTargetIndex === index ? '1' : '0') : '0'} /> 
          ))
          
          : // display start and all maerkers
          this.props.dataMap.start.map((current, index, array) => (
        
        <Marker 
          id={index}
          className={'marker'}
          key={index + 241242 + index} 
          onClick={this.props.dataMap.clicked}
          name={current.venue.name}
          title={array[index].venue.location.address}
          position={{
            lat: current.venue.location.lat, lng: current.venue.location.lng
          }}// if clicked test index against listTargetIndex
          animation={this.props.dataMap.AppData.listActive ? (this.props.dataMap.AppData.listTargetIndex === index ? '1' : '0') : '0'} />       
          )) }
      </Map>
     );
  }
}
 
export default MapDisplay;