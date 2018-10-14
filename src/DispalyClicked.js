import React, { Component } from 'react';
import { dirname } from 'path';

class DispalyClicked extends Component {
  
  render() { 
    console.log(this.props);
    console.log(this.props.listInfo);
    console.log(this.props.listInfo.pick);
    if(this.props.listInfo.pick.meta !== undefined) {
    console.log(this.props.listInfo.pick.meta.code);
    console.log(this.props.listInfo.pick.response.photos.items[0]);
    console.log(this.props.listInfo.pick.response.photos.items[1]);
    /*
    let prefix0 = this.props.listInfo.pick.response.photos.items[0].prefix;
    let suffix1 = this.props.listInfo.pick.response.photos.items[1].suffix;
    let prefix1 = this.props.listInfo.pick.response.photos.items[1].prefix;
    let suffix0 = this.props.listInfo.pick.response.photos.items[0].suffix;

    <img src={`${prefix0}${suffix0}`} alt="Smiley face" height="42" width="42"/>
        <img src={`${prefix1}${suffix1}`} alt="Smiley face" height="42" width="42"/>
        <img src={`https://igx.4sqi.net/img/general/4585668_6gb3-nJW_oehshUj1eDDU2-hq4igwvloi_MePhRXzb4.jpg`} alt="Smiley face" height="42" width="42"/>


    */
   /*  look at this tommorow  */
    return ( 
      <div className="dispalyClicked">
        <h2>Name: {this.props.listInfo.AppData.listActiveTargetName}</h2>
        <h2>address: {this.props.listInfo.AppData.listActiveTargetAddress}</h2>
        
        <button onClick={this.props.listInfo.closeList} >close</button>
      </div>
     );
    }

    return ('');

  }
}
 
export default DispalyClicked;
