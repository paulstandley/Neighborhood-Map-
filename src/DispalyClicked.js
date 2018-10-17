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
    
        var prefix0 = this.props.listInfo.pick.response.photos.items[0].prefix;
        var suffix0 = this.props.listInfo.pick.response.photos.items[0].suffix;
        var size0 =  this.props.listInfo.pick.response.photos.items[0].width;

        var img0 = <span className="topList">
        <h2>{this.props.listInfo.AppData.listActiveTargetName}</h2>
        <img src={`${prefix0}${size0}${suffix0}`} alt={this.props.listInfo.AppData.listActiveTargetName} height="220" width="220"/>
        <h2>{this.props.listInfo.AppData.listActiveTargetAddress}</h2>
        </span>;

      }// only one pick per venue four
      if(this.props.listInfo.pick.response.photos.items[1] !== undefined) {
        console.log(this.props.listInfo.pick.response.photos.items[1]);

        var suffix1 = this.props.listInfo.pick.response.photos.items[1].suffix;
        var prefix1 = this.props.listInfo.pick.response.photos.items[1].prefix1;
        var size1 =  this.props.listInfo.pick.response.photos.items[1].width;
console.log(size1)
        var img1 = <span className="bottomList">
        <h2>{this.props.listInfo.AppData.listActiveTargetName}</h2>
        <img src={`${prefix1}${size1}${suffix1}`} alt={this.props.listInfo.AppData.listActiveTargetName} height="220" width="220"/>
        <h2>{this.props.listInfo.AppData.listActiveTargetAddress}</h2>
        </span>;
      }

   /*  look at this tommorow  */
    return ( 
      <div className="dispalyClicked">
        {this.props.listInfo.pick.response.photos.items[0] !== undefined  ? <aside className='img0'>{img0}</aside> : <span className="fallbackDisply">
        <h2>{this.props.listInfo.AppData.listActiveTargetName}</h2>
        <img src={`https://res.cloudinary.com/pieol2/image/upload/v1539814762/sozNoPick.png`} alt='sorry no image' height="200" width="480"/>
        <h2>{this.props.listInfo.AppData.listActiveTargetAddress}</h2>
        </span> } 
        
        <button onClick={this.props.listInfo.closeList} >close</button>
      </div>
     );
    }
  
    return (<button onClick={this.props.listInfo.closeList} >Soz no info</button>);

  }
}
 
export default DispalyClicked;
