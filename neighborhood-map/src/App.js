import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import DataFile from './DataFile.json';
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
    DATAFILE: DataFile.response.groups[0].items.sort(sortBy('venue.name')),
    query: '',
    clicked: (evt) => {
      console.log(evt)
      if(evt.name !== undefined) {
        console.log(`Map Event`);
        console.log(evt);
        console.log(evt.name);
        console.log(evt.title);
        console.log(evt.animation);
        console.log(evt)
      }else{
      console.log(`List Event`);
      console.log(evt);
      console.log(evt.target)
      console.log(evt.type)
      console.log(evt.currentTarget)
      console.log(evt.metaKey)
      }
      //console.log(evt.va.target.title)
    },
    pick: {}
  }

  
  componentDidMount() {
    
    /* foursquare data for Oldham docs 
    <img src={`${this.props.pick.response.photos.items[0].prefix}${this.props.pick.response.photos.items[0].suffix}`}></img>
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch	https://www.npmjs.com/package/google-maps-react 
    https://foursquare.com/developers/explore#req=venues%2Fexplore%3Fnear%3DOldham */        
    fetch('https://api.foursquare.com/v2/venues/explore?near=Oldham&client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826')
    .then((response) => {
      return response.json();
    }).then((myJson) => {
    
        this.setState({foursquare: myJson.response.groups[0].items});
    }).catch(error => console.error('Error:', error));
/*
    fetch('https://api.foursquare.com/v2/venues/4c38697d0a71c9b6298e40c9/photos?client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826').then((response) => {
      return response.json();
    }).then((pick) => {
      this.setState({pick})
    })
    */
  }
/* event handeler */  
  updateQueryHandeler = (query) => {
    this.setState({ query: query.trim()} );
    
  }

  render() {
    if(this.state.pick.response !== undefined) {
      console.log(this.state.pick);
    console.log(this.state.pick.response);
    console.log(this.state.pick.response.photos);
    console.log(this.state.pick.response.photos.items[0]);
    console.log(this.state.pick.response.photos.items[1]);
    console.log(this.state.pick.response.photos.items[0].prefix);
    console.log(this.state.pick.response.photos.items[1].prefix);
    console.log(this.state.pick.response.photos.items[0].suffix);
    console.log(this.state.pick.response.photos.items[1].suffix);
    }
    let filtered;
    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query),'i');
      //filtered = this.state.venue.filter((places) => match.test(places.name));
      filtered = this.state.foursquare.filter((value) => match.test(value.venue.name));
      console.log(filtered)
      filtered.sort(sortBy('venue.name'));
      DataFile.response.groups[0].items.sort(sortBy('venue.name'));
      //console.log(filtered[0].venue.name)
      //console.log(filtered[1].venue.id)
    }else{
      filtered = this.state.DataFile;
    }
    if(filtered !== undefined) {
      return (
        <div className="App">
          <header>
          <h1>Neighborhood Map</h1>
          </header>
          <main id="mainPage" className="main-page">
            <section id="sectionList" className="section-list">
              <input type="text" 
              aria-label="text"
              aria-required="true"
              id="sectionInput" 
              className="section-input" 
              placeholder="Filter places by name"
              value={this.state.query}
              onChange={(event) => this.updateQueryHandeler(event.target.value)}/>
              <List venue={filtered} pick={this.state.pick} clicked={this.state.clicked} />
            </section>
            <section id="sectionMap" className="section-map">
              <Map venue={filtered} clicked={this.state.clicked} />
            </section>
          </main>
          
        </div>
      );
    }else{
      return (
        <div className="App">
          <header>
          <h1>Neighborhood Map</h1>
          </header>
          <main id="mainPage" className="main-page">
            <section id="sectionList" className="section-list">
              <input type="text" 
              aria-label="text"
              aria-required="true"
              id="sectionInput" 
              className="section-input" 
              placeholder="Filter places by name"
              value={this.state.query}
              onChange={(event) => this.updateQueryHandeler(event.target.value)}/>
              <List start={DataFile.response.groups[0].items} clicked={this.state.clicked} />
            </section>
            <section id="sectionMap" className="section-map">
              <Map start={DataFile.response.groups[0].items} clicked={this.state.clicked} />
            </section>
          </main>
          
        </div>
      )
    }
    
  }
}

export default App;
