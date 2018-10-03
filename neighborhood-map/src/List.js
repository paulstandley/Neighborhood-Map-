import React, { Component } from 'react';
import "./App.css";

class List extends Component {
  
  render() {
    console.log(this.props.venue)
    console.log(this.props.start)
    return ( 
      <div>
        <h2>LIST COMPONENT</h2>
        <div>
          <ol>
            {this.props.venue !== undefined ? 
            this.props.venue.map((current, index, array) => (
              <li key={index + 354352 + index} >
  
              {current.venue !== undefined ? <span onClick={(evt) => {
                console.log(evt.target)
               }}>
             
                <img src="https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png" alt="planet" width="16" height="16"></img>
                <h3>{current.venue.name}</h3>
                
              </span> : console.log(current.name)}
                
              </li>
            ))
            
            : this.props.start.map((current, index, array) => (
              <li key={index + 348734 + index}>
              
              {current.venue !== undefined ? <span onClick={(evt) => {
                console.log(evt)
                console.log(evt.target)
                console.log(evt.timeStamp)
                console.log(evt.eventPhase)
                console.log(evt.relatedTarget)
                console.log(evt.detail)
                console.log(evt.getModifierState)
               }}>
            
                <img src="https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png" alt="planet" width="16" height="16"></img>
                <h3>{current.venue.name}</h3>
               
              </span> : console.log(current.name)}
                
              </li>
            )) }
          </ol>
        </div>
      </div>
     );
  }
}
 
export default List;