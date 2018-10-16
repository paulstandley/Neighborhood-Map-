import React, { Component } from 'react';
import { dirname } from 'path';

class DispalyClicked extends Component {
  
  render() { 
    console.log(this.props);
    console.log(this.props.listInfo);
    console.log(this.props.listInfo.pick);
    if(this.props.listInfo.pick.meta !== undefined) {
    console.log(this.props.listInfo.pick.meta.code);
    if(this.props.listInfo.pick.response.photos.items[0] !== undefined) {
    console.log(this.props.listInfo.pick.response.photos.items[0]);
    console.log(this.props.listInfo.pick.response.photos.items[1]);
      var prefix0 = this.props.listInfo.pick.response.photos.items[0].prefix;
      var suffix0 = this.props.listInfo.pick.response.photos.items[0].suffix;
      var size0 =  this.props.listInfo.pick.response.photos.items[0].width;

    }
    if(this.props.listInfo.pick.response.photos.items[1] !== undefined) {
      var suffix1 = this.props.listInfo.pick.response.photos.items[1].suffix;
      var prefix1 = this.props.listInfo.pick.response.photos.items[1].prefix1;
      var size1 =  this.props.listInfo.pick.response.photos.items[1].width;
    }

/*
    <img src={`${prefix0}${suffix0}`} alt="Smiley face" height="42" width="42"/>
        <img src={`${prefix1}${suffix1}`} alt="Smiley face" height="42" width="42"/>
        <img src={`https://igx.4sqi.net/img/general//45517011_6Dwm7GIsheYpAXRrGnwXmuLzMlOHMpDy96bNrjhvkZc.jpg`} alt="Smiley face" height="42" width="42"/>
/*

    
   /*  look at this tommorow  */
    return ( 
      <div className="dispalyClicked">
        {this.props.listInfo.pick.response.photos.items[0] !== undefined ? 
          <span className="topList">
          <h2>{this.props.listInfo.AppData.listActiveTargetName}</h2>
          <img src={`${prefix0}${size0}${suffix0}`} alt={this.props.listInfo.AppData.listActiveTargetName} height="420" width="420"/>
        </span>
          : '' }
        {this.props.listInfo.pick.response.photos.items[1] !== undefined ?
          <span className="bottomList">
          <h2>{this.props.listInfo.AppData.listActiveTargetAddress}</h2>
          <img src={`${prefix1}${size1}${suffix1}`} alt={this.props.listInfo.AppData.listActiveTargetName} height="420" width="420"/>
        </span>  
          : '' }
        
        <button onClick={this.props.listInfo.closeList} >close</button>
      </div>
     );
    }
  

    return (<button onClick={this.props.listInfo.closeList} >Soz do info</button>);

  }
}
 
export default DispalyClicked;
