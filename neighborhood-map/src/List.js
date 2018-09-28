import React, { Component } from 'react';
import "./App.css";

class List extends Component {
  
  render() {
     
    return ( 
      <div>
        <h1>LIST COMPONENT</h1>
        <div>
          <ol>
            {this.props.venue !== undefined ? 
            this.props.venue.map((current, index, array) => (
              <li key={index}>
              {console.log(current.venue)}
              {current.venue !== undefined ? <span>
                <h3>{current.venue.name}</h3>
                <img src={'https://res.cloudinary.com/pieol2/image/upload/v1517686892/Image68_vaf44k.jpg'} alt={current.venue.name} width="100" height="80"></img>
                <h4>{current.venue.location.address}</h4>
              </span> : console.log(current.name)}
                
              </li>
            ))
            
            : 'Updated info'}
          </ol>
        </div>
      </div>
     );
  }
}
 
export default List;