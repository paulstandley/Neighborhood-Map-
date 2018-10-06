import React, { Component } from 'react';
import './index.css';
import "./App.css";

class ListApp extends Component {
  
  render() {
   
    return ( 
      <div>
        <h2>OLDHAM</h2>
        <div>
          <ol>
            {this.props.venue !== undefined ? 
            this.props.venue.map((current, index, array) => (
              <li key={index + 354352 + index} >
  
              {current.venue !== undefined ? <span id={`${index}`} onClick={this.props.clicked}>
             
                <img src="https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png" alt="planet" width="16" height="16"></img>
                <h3>{current.venue.name}</h3>
                <h3>{array[index].venue.location.address}</h3>
              </span> : console.log(current.name)}
                
              </li>
            ))
            
            : this.props.start.map((current, index, array) => (
              <li key={index + 348734 + index}>
              
              {current.venue !== undefined ? <span id={`${index}`} onClick={this.props.clicked}>
            
                <img src="https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png" alt="planet" width="16" height="16"></img>
                <h3>{current.venue.name}</h3>
                <h3>{array[index].venue.location.address}</h3>
              </span> : console.log(current.name)}
                
              </li>
            )) }
          </ol>
        </div>
      </div>
     );
  }
}
 
export default ListApp;