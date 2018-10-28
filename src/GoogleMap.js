import React, { Component } from 'react';
import './App.css';
import './index.css';

class GoogleMap extends Component {

  componentDidMount() {
    this.displayMap();
  }

  displayMap = () => {
    /* call render scrip and pass in google map url and api key */
    renderScripElement('https://maps.googleapis.com/maps/api/js?key=AIzaSyDcheCgHTyf9zr3vcCCSOo0wrq_W95sUcA&callback=initMap');
    /* set init map to window gobal object */
    window.initMap = this.initMap;
  }


  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 53.540203, lng: -2.102056 },
      zoom: 12
    });
  }

  render() { 
    return ( 
      <div>
        <div id='map'></div>
      </div>
     );
  }
}
 
function renderScripElement(srcUrl) {
  const firstChildScriptTag = window.document.getElementsByTagName('script')[0];
  const scriptTag = window.document.createElement('script');
  scriptTag.src = srcUrl;
  scriptTag.defer = true;  
  scriptTag.async = true;
  /* I wish I had come up with this but Elharony did he did great so simple */
  firstChildScriptTag.parentNode.insertBefore(scriptTag, firstChildScriptTag);
}

export default GoogleMap;