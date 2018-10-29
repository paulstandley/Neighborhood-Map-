import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import DataFile from './assets/DataFile.json';
import ListApp from './ListApp';

import './App.css';

class App extends React.Component {
/* https://review.udacity.com/?utm_campaign=ret_000_auto_ndxxx_submission-reviewed&utm_source=blueshift&utm_medium=email&utm_content=reviewsapp-submission-reviewed&bsft_clkid=ea10489b-a680-426e-bfe6-8f2ad56e7a8e&bsft_uid=ed91580d-4503-417b-b860-9958e533e56f&bsft_mid=bc204dfa-44cd-45b6-be5e-81bc282f57f1&bsft_eid=6f154690-7543-4582-9be7-e397af208dbd&bsft_txnid=6e3b1fff-d748-447d-a45e-16c71ee53b30#!/reviews/1525760  */
  constructor(props) {
   super(props);
    this.state = {
      filtered: [],
      foursquare: {},
      DATAFILE: DataFile.response.groups[0].items.sort(sortBy('venue.name')),
      query: '',
      errorTest: false,
      error_gm_Aurth: null,
      pick: {},
      listActiveTargetMarker: {},
      listActiveTargetAddress: {},
      listActiveTargetName: {},
      listTargetIndex: null,
      listActive: false,
      animate: ['BOUNCE','DROP']
    };
    this.updateQueryHandeler = this.updateQueryHandeler.bind(this);
    this.clicked = this.clicked.bind(this);
    this.closeList = this.closeList.bind(this);    
  }
 
  componentDidMount() {  
    /* foursquare data for Oldham  */       
    fetch('https://api.foursquare.com/v2/venues/explore?near=Oldham&client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826')
    .then((response) => {
      return response.json();
    }).then((myJson) => {
        this.setState({foursquare: myJson.response.groups[0].items});
    }).catch(() => { this.setState({ errorTest: true }) })
    /* set map */
    this.displayMap();
  }

  displayMap = () => {
 
    /* call render scrip and pass in google map url and api key */
    renderScripElement('https://maps.googleapis.com/maps/api/js?key=AIzaSyDcheCgHTyf9zr3vcCCSOo0wrq_W95sUcA&callback=initMap');
      
  
    /* set init map to window gobal object */
    window.initMap = this.initMap;
    /* after days of docks just and it tio gloabal scope */
    window.gm_authFailure = this.gm_authFailure;
  }

/* init map */

  _initMap = () => {
    
    var clickBounce;
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 53.540203, lng: -2.102056 },
      zoom: 11
    });
    if (this.state.listActive) {
      clickBounce = window.google.maps.Animation[this.state.animate[0]];
      // setup markers filtered or from json
      if (this.state.query === '') {
        clickBounce = window.google.maps.Animation[this.state.animate[1]];
        // json      
        this.state.DATAFILE.map((current, index, array) => {
          var marker = new window.google.maps.Marker({
            position: { lat: current.venue.location.lat, lng: current.venue.location.lng },
            map: map,
            title: array[index].venue.location.address,
            id: index,
            key: index + 241242 + index,
            name: current.venue.name,
            animation: clickBounce,
            icon: 'https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png'
          });
          window.google.maps.event.addListener(marker, 'click', this.mapClickMethod(map, marker, current));
        });
      }
      else {
        // filtered      
        this.state.filtered.map((current, index, array) => {
          var marker = new window.google.maps.Marker({
            position: { lat: current.venue.location.lat, lng: current.venue.location.lng },
            map: map,
            title: array[index].venue.location.address,
            id: index,
            key: index + 448365 + index,
            name: current.venue.name,
            animation: clickBounce,
            icon: 'https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png'
          });
          window.google.maps.event.addListener(marker, 'click', this.mapClickMethod(map, marker, current));
        });
      }
    }
    else {
      // setup markers filtered or from json
      if (this.state.query === '') {
        // json      
        this.state.DATAFILE.map((current, index, array) => {
          var marker = new window.google.maps.Marker({
            position: { lat: current.venue.location.lat, lng: current.venue.location.lng },
            map: map,
            title: array[index].venue.location.address,
            id: index,
            key: index + 241242 + index,
            name: current.venue.name,
            animation: clickBounce,
            icon: 'https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png'
          });
          window.google.maps.event.addListener(marker, 'click', this.mapClickMethod(map, marker, current));
        });
      }
      else {
        // filtered      
        this.state.filtered.map((current, index, array) => {
          var marker = new window.google.maps.Marker({
            position: { lat: current.venue.location.lat, lng: current.venue.location.lng },
            map: map,
            title: array[index].venue.location.address,
            id: index,
            key: index + 448365 + index,
            name: current.venue.name,
            animation: clickBounce,
            icon: 'https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png'
          });
          window.google.maps.event.addListener(marker, 'click', this.mapClickMethod(map, marker, current));
        });
      }
    }
  };
  mapClickMethod(map, marker, current) {
    //console.log(map);
    //console.log(marker);
    //console.log(current);
/* 900 requset 1800 on render need a loader  */
    //this.clicked(map, marker, current);

    //this.clicked(marker);
    return function () {
      
      map.setZoom(14);
      window.setTimeout(function () {
        map.setZoom(11);
        marker.setAnimation(window.google.maps.Animation.DROP);
      }, 6000);
      map.setCenter(marker.getPosition({ lat: current.venue.location.lat, lng: current.venue.location.lng }));
      marker.animation = window.google.maps.Animation.BOUNCE;
    };
  }

  get initMap() {
    return this._initMap;
  }
  set initMap(value) {
    console.log(value);
    this._initMap = value;
  }

  gm_authFailure() {
    window.alert("Google Maps error!");
  }

/* event handeler update state then rerender map */  
  updateQueryHandeler = (query) => { 
    console.log(query);
    this.updateQueryHandelerMethod(query);
    this.displayMap();
  };
/* get input query then return filtered array or json object and then put in state */
  updateQueryHandelerMethod(query) {
    console.log(query);
    var filtered;
    if(query) {// get a regex match filter and sort then setstate
      const match = new RegExp(escapeRegExp(query), 'i');
      filtered = this.state.DATAFILE.filter((value) => match.test(value.venue.name));
      filtered.sort(sortBy('venue.name'));
      console.log(filtered);
      this.setState({
        query: query.trim(), 
        filtered: filtered
       });
    }else{// setstate json
      filtered = this.state.DATAFILE;
      this.setState({
        query: query.trim(), 
        filtered: filtered
       });
    }
    return filtered; 
  }
/* close list reset state */
  closeList = (evt) => {
    this.setState({ 
      pick: {},
      listActiveTargetMarker: {},
      listActiveTargetAddress: {},
      listActiveTargetName: {},
      listTargetIndex: null,
      listActive: false,
      errorTest: false
    });
  }
/* check evt list or map */
  clicked = (map, marker, current) => {  
/* set evt to state map*/    
    if(map.currentTarget === undefined) {// chande to stop render onload :)
    this.setState({
      listActiveTargetName: current.venue.name,
      listActiveTargetMarker: marker,
      listActiveTargetAddress: current.venue.location.address,
      listTargetIndex: Number(marker.id),
      listActive: true
    })/* get target index info for fetch */  
    if(this.state.listTargetIndex !== null) {
      let num0 = this.state.listTargetIndex;
      let picked0 = this.state.DATAFILE[num0].venue.id;        
      fetch(`https://api.foursquare.com/v2/venues/${picked0}/photos?client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826`).then((response) => {
        return response.json();
      }).then((pick) => {
        this.setState({pick})
      }).catch(() => {
        this.setState({ errorTest: true })
      });
    }/* set evt to list */
    }else{
    if(map.currentTarget !== undefined) {
console.log(map.target.innerText)
console.log(map)
console.dir(marker)
console.log(map.type)
console.log(map.currentTarget)
      var targetElement = map.currentTarget;
      var tarIndex = targetElement.getAttribute('id');
      var tarName =  targetElement.getElementsByTagName('h3');
      var tarAdd = targetElement.getElementsByTagName('h5');
      console.log(Number(tarIndex));
      console.log(tarName[0].innerText);
      console.log(tarAdd[0].innerText);
      this.setState({ 
        listActiveTargetName: tarName[0].innerText,
        listActiveTargetMarker: map,
        listActiveTargetAddress: tarAdd[0].innerText,
        listTargetIndex: Number(tarIndex),
        listActive: true
       })/* get target index info for fetch */
      let num1 = Number(tarIndex);
      let picked1 = this.state.DATAFILE[num1].venue.id;
      console.log(picked1)
      fetch(`https://api.foursquare.com/v2/venues/${picked1}/photos?client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826`).then((response) => {
        return response.json();
      }).then((pick) => {
        this.setState({pick})
      }).catch(() => {
        this.setState({ errorTest: true });
      });
      }   
    }
  };

  render() {
    
   return (
     <div className="App">
       <header>
         <h1>Neighborhood Map</h1>
       </header>    
       {this.state.query !== '' ? // display filtered list and map markers
       <main id="mainPage" className="main-page">
         <section id="sectionList" className="section-list">
         {this.state.listActive === false ? 
            <input type="text" 
            aria-label="text"
            aria-required="true"
            id="sectionInput" 
            className="section-input" 
            placeholder="Filter foursquare list"
            value={this.state.query}
            onChange={(event) => this.updateQueryHandeler(event.target.value)}/> 
          : /* remove when list is active */ 
          this.state.errorTest === true ? <span className="errorDisplay">
          <h2 onClick={this.closeList}>Sorry error getting image click me to try again</h2>   
          </span> : 
          <input type="text" 
          aria-label="text"
          aria-required="true"
          id="sectionInput" 
          className="noSection-input" 
          placeholder="Filter foursquare list"
          value={this.state.query}// check fetch response display sorryv
          onChange={(event) => this.updateQueryHandeler(event.target.value)}/> }
         <ListApp closeList={this.closeList} start={this.state.DATAFILE} venue={this.state.filtered} pick={this.state.pick} clicked={this.clicked} AppData={this.state}/>      
         </section>
         <section id="sectionMap" className="section-map">
           <div id='map'></div> 
         </section>
        </main>
       :  // display start list and all markers
       <main id="mainPage" className="main-page">
         <section id="sectionList" className="section-list">
          {this.state.listActive === false ? 
            <input type="text" 
            aria-label="text"
            aria-required="true"
            id="sectionInput" 
            className="section-input" 
            placeholder="Filter foursquare list"
            value={this.state.query}
            onChange={(event) => this.updateQueryHandeler(event.target.value)}/> 
          : /* remove when list is active */ 
          this.state.errorTest === true ? <span className="errorDisplay">
          <h2 onClick={this.closeList}>Sorry error getting image click me to try again</h2>
          </span> :  <input type="text" 
            aria-label="text"
            aria-required="true"
            id="sectionInput" 
            className="noSection-input" 
            placeholder="Filter foursquare list"
            value={this.state.query}// check fetch response display sorry
            onChange={(event) => this.updateQueryHandeler(event.target.value)}/>}
          <ListApp closeList={this.closeList} start={this.state.DATAFILE} venue={this.state.filtered} pick={this.state.pick} clicked={this.clicked} AppData={this.state}/>
          </section>
        <section id="sectionMap" className="section-map">
        <div id='map'></div>
        </section>
      </main>    
      }       
     </div>
   );
  }
}
 /* I wish I had come up with this but Elharony did he did great so simple */
function renderScripElement(srcUrl) {
/* make sure its the first script tag make a script tag add atrrs */  
  const firstChildScriptTag = window.document.getElementsByTagName('script')[0];
  //const secondChildScriptTag = window.document.getElementsByTagName('script')[1];
  const scriptTag = window.document.createElement('script');
  //const scriptTag1 = window.document.createElement('script');
  scriptTag.src = srcUrl;
  scriptTag.defer = true;  
  scriptTag.async = true;
  /*const name = `
  ${function gm_authFailure() {
    window.alert("Google Maps error!");
  }}`;*/
  
/* then place it in the dom as a first child */ 
  firstChildScriptTag.parentNode.insertBefore(scriptTag, firstChildScriptTag);
  //secondChildScriptTag.parentNode.insertBefore(scriptTag1, secondChildScriptTag);
  //secondChildScriptTag.parentNode.insertBefore(inside, secondChildScriptTag);
}

function gm_authFailure() {
  window.alert("Google Maps error!");
}

export default App;

App.propTypes = {
  queryMethod: PropTypes.func,
  onMarkerClick: PropTypes.func,
  clicked: PropTypes.func,
  closeList: PropTypes.func
};