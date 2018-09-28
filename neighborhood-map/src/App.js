import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import  escapeRegExp from 'escape-string-regexp';
import List from './List';
import Map from './Map';
import './App.css';

// get four squre API display top 5

class App extends Component {

  /*
  static propTypes = {
    foursquare: propTypes.object.isRequired,
    updateQueryHandeler: propTypes.func.isRequired,
    filteredDATA: propTypes.array.isRequired,
    query: propTypes.string.isRequired
  }*/

  state = {
    foursquare: {},
    filteredDATA: [],
    venue: [
      {
        name: "Whittles",
        address: "27 King Street Oldham",
        img: "http://res.cloudinary.com/pieol2/image/upload/v1535302636/whittles.jpg",
        phone: "Telephone 0161 633 5468",
        location: { lat: 53.540203, lng: -2.117056 },
        id: 1
      },
      {
        name: "Bank Top Tavern",
        address: "Kings Square Oldham",
        img: "http://res.cloudinary.com/pieol2/image/upload/v1535307053/banktop.jpg",
        phone: "Telephone 0161 624 8603",
        location: { lat: 53.541051, lng: -2.117946 },
        id: 2
      },
      {
        name: "Tommyfield",
        address: "Tommyfield St. Mary's Way Oldham",
        img: "http://res.cloudinary.com/pieol2/image/upload/v1535317577/toommyfield.jpg",
        phone: "Telephone 0161 678 8545",
        location: { lat: 53.543734, lng: -2.115444 },
        id: 3
      },
      {
        name: "George Tavern",
        address: "George Street, Oldham, Greater Manchester",
        img: "http://res.cloudinary.com/pieol2/image/upload/v1535498317/George.jpg",
        phone: "Telephone 0161 624",
        location: { lat: 53.540723, lng: -2.116029 },
        id: 4
      },
      {
        name: "Buck & Union",
        address: "36 Union Street Oldham",
        img: "http://res.cloudinary.com/pieol2/image/upload/v1535318035/buckandunion.jpg",
        phone: "Telephone 0161 628 0301",
        location: { lat: 53.539939, lng: -2.113569},
        id: 5,
      }
      ] ,
    query: ''
  }

  componentDidMount() {
    /* foursquare data for Oldham docs https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch	https://www.npmjs.com/package/google-maps-react 
    https://foursquare.com/developers/explore#req=venues%2Fexplore%3Fnear%3DOldham */        
    fetch('https://api.foursquare.com/v2/venues/explore?near=Oldham&client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826')
    .then((response) => {
      return response.json();
    }).then((myJson) => {
        console.log(JSON.stringify(myJson));
        this.setState({foursquare: myJson});
    }).catch(error => console.error('Error:', error));
  }
/* event handeler */  
  updateQueryHandeler = (query) => {
    this.setState({ query: query.trim()} );
    
    console.log(query);
    console.log(this.state.foursquare.meta.code);
    console.log(this.state.foursquare.response);
    console.log(this.state.foursquare.response.groups[0].items[0].venue);
    console.log(this.state.foursquare.response.groups[0].items[0].venue.id);
    console.log(this.state.foursquare.response.groups[0].items[0].venue.name);
    console.log(this.state.filteredDATA);
  }

  render() {
    console.log(this.state.foursquare);
    let { DATA } = this.state.foursquare;
    
    let filtered;
    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query),'i');
      //filtered = this.state.venue.filter((places) => match.test(places.name));
      filtered = this.state.foursquare.response.groups[0].items.filter((value) => match.test(value.venue.name));
      console.log(filtered)
      filtered.sort(sortBy('venue.name'));
      //console.log(filtered[0].venue.name)
      //console.log(filtered[1].venue.id)
    }else{
      filtered = this.state.splashPage;
    }
    if(DATA !== undefined) {
      return (
        <div className="App">
          <header>
          <h1>Neighborhood Map</h1>
          </header>
          <main id="mainPage" className="main-page">
            <section id="sectionList" className="section-list">
              <input type="text" 
              id="sectionInput" 
              className="section-input" 
              placeholder="Filter places by name"
              value={this.state.query}
              onChange={(event) => this.updateQueryHandeler(event.target.value)}/>
              <List Data={DATA} />
            </section>
            <section id="sectionMap" className="section-map">
              <Map Data={DATA}/>
            </section>
          </main>
          <footer>
            Udacitys last project for the FEND Nano Degree Program udacity.com/nanodegrees
          </footer>
        </div>
      );
    }else{
      return (
        <div className="App">
          <header>
          <h1>NO DATA!</h1>
          </header>
          <main id="mainPage" className="main-page">
            <section id="sectionList" className="section-list">
              <input type="text" 
              id="sectionInput" 
              className="section-input" 
              placeholder="Filter places by name"
              value={this.state.query}
              onChange={(event) => this.updateQueryHandeler(event.target.value)}/>
              <List Data={DATA} venue={filtered}/>
            </section>
            <section id="sectionMap" className="section-map">
              <Map Data={DATA}/>
            </section>
          </main>
          <footer>
            Udacitys last project for the FEND Nano Degree Program udacity.com/nanodegrees
          </footer>
        </div>
      )
    }
    
  }
}

export default App;
