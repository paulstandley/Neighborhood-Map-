import React, { Component } from 'react';

class DispalyClicked extends Component {
  
  render() {
    console.log(this.props);
/* check for data get and display or diplay fallbacks */
    if(this.props.listInfo.pick.response === undefined) {
      if(this.props.listInfo.AppData.DispalyClicked === false) {      
        var prefix0 = this.props.listInfo.pick.response.photos.items[0].prefix;
        var suffix0 = this.props.listInfo.pick.response.photos.items[0].suffix;
        var size0 = this.props.listInfo.pick.response.photos.items[0].width;
        var img0;
        if(this.props.listInfo.AppData.listActiveTargetAddress === undefined) {
        img0 = <span className="topList">
        <h2>{this.props.listInfo.AppData.listActiveTargetName}</h2>
        <img id="pickId" src={`${prefix0}${size0}${suffix0}`} alt={this.props.listInfo.AppData.listActiveTargetName} height="220" width="220"/>
        <h2>NO Fourssqure Data</h2>
        </span>;
        }else{
        img0 = <span className="topList">
        <h2>{this.props.listInfo.AppData.listActiveTargetName}</h2>
        <img id="pickId" src={`${prefix0}${size0}${suffix0}`} alt={this.props.listInfo.AppData.listActiveTargetName} height="220" width="220"/>
        <h2>{this.props.listInfo.AppData.listActiveTargetAddress}</h2>
        </span>;
        }
      }/* only one pick per venue foursqure free plan :(
         Useing var for its none block scope 
      */
    return ( 
      <div className="dispalyClicked">
        {this.props.listInfo.pick.response !== undefined  ? <aside className='img0'>{img0}</aside> : <aside className='img0'><span className="fallbackDisplay">
        <h2>{this.props.listInfo.AppData.listActiveTargetName}</h2>
        <img id="pickId" src={`https://res.cloudinary.com/pieol2/image/upload/v1540143138/thankYou.png`} alt="a thank you Udacity" height="220" width="220"/>
        <h2>{this.props.listInfo.AppData.listActiveTargetAddress === null ? <h2>No Info</h2> : this.props.listInfo.AppData.listActiveTargetAddress}</h2>
        </span></aside> }         
        <button onClick={this.props.listInfo.closeList} >close</button>
      </div>
     );
    }// this. is rendered ?
    return (<span><h2>YO</h2><button onClick={this.props.listInfo.closeList} >Soz no info</button></span>);
  }
}
 
export default DispalyClicked;
