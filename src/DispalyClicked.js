import React, { Component } from 'react';

class DispalyClicked extends Component {
  
  render() { 
    console.log(this.props);
    return ( 
      <div className="dispalyClicked">
        <h2>Name: {this.props.listInfo.AppData.listActiveTargetName}</h2>
        <h2>address: {this.props.listInfo.AppData.listActiveTargetAddress}</h2>
        <button onClick={this.props.listInfo.closeList} >close</button>
      </div>
     );
  }
}
 
export default DispalyClicked;
