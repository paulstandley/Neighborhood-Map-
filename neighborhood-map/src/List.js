import React, { Component } from 'react';
import "./App.css";

class List extends Component {
  
  render() {
     
    return ( 
      <div>
        <h1>LIST COMPONENT</h1>
        <div>
          <ol>
            {this.props.splashPage !== undefined ? 
            this.props.splashPage.map((current, index, array) => (
              <li key={index}>
              {console.log(current.venue)}
              {current.venue !== undefined ? console.log(current.venue.name) : console.log(current.name)}
                {JSON.stringify(array[index])}
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