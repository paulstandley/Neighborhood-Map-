import React, { Component } from 'react';


class List extends Component {
  state = { 
    hasDATA: false
   }
  render() {
    if(this.state.hasDATA) {
      console.log(this.props);
    } 
    console.log(this.props);
    return ( 
      <div>
        <h1>LIST COMPONENT</h1>
      </div>
     );
  }
}
 
export default List;