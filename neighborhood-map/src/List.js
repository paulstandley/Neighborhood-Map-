import React, { Component } from 'react';
import "./App.css";

class List extends Component {
  
  render() {
    console.log(this.props.venue)
    console.log(this.props.start)
    return ( 
      <div>
        <h1>LIST COMPONENT</h1>
        <div>
          <ol>
            {this.props.venue !== undefined ? 
            this.props.venue.map((current, index, array) => (
              <li key={Math.floor(Math.random() * 10000)}>
              {console.log(current.venue)}
              {current.venue !== undefined ? <span>
                <hr />
                <h3>{current.venue.name}</h3>
                <h4>{current.venue.location.address}</h4>
              </span> : console.log(current.name)}
                
              </li>
            ))
            
            : this.props.start.map((current, index, array) => (
              <li key={Math.floor(Math.random() * 10000)}>
              {console.log(current.venue)}
              {current.venue !== undefined ? <span>
                <hr />
                <h3>{current.venue.name}</h3>
                <h4>{current.venue.location.address}</h4>
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