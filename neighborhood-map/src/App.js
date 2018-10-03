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
        this.setState({foursquare: myJson.response.groups[0].items});
    }).catch(error => console.error('Error:', error));
  }
/* event handeler */  
  updateQueryHandeler = (query) => {
    this.setState({ query: query.trim()} );
    
  }
  

  render() {
    console.log(this.state.foursquare);
    console.log(this.state)
    console.log(DataFile.response.groups[0].items);
    
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
              <List venue={filtered} />
            </section>
            <section id="sectionMap" className="section-map">
              <Map venue={filtered} />
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
              aria-label="text"
              aria-required="true"
              id="sectionInput" 
              className="section-input" 
              placeholder="Filter places by name"
              value={this.state.query}
              onChange={(event) => this.updateQueryHandeler(event.target.value)}/>
              <List start={DataFile.response.groups[0].items}/>
            </section>
            <section id="sectionMap" className="section-map">
              <Map start={DataFile.response.groups[0].items}/>
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
