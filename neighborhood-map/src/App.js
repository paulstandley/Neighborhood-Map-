import React, { Component } from 'react';
import List from './List';
import Map from './Map';
import './App.css';

// get four squre API display top 5

class App extends Component {

  state = {
    foursquare: {}
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
  

  render() {
    console.log(this.state.foursquare);
    let { DATA } = this.state.foursquare;
    return (
      <div className="App">
        <header>
        <h1>Neighborhood Map</h1>
        </header>
        <main id="mainPage" className="main-page">
          <section id="sectionList" className="section-list">
            <List Data={DATA}/>
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
  }
}

export default App;
