import React, { Component } from 'react';
import './App.css';

// get four squre API display top 5

class App extends Component {

  componentDidMount() {
    /* fourssquare data for Oldham docs https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch	https://www.npmjs.com/package/google-maps-react 
    https://foursquare.com/developers/explore#req=venues%2Fexplore%3Fnear%3DOldham */        
    fetch('https://api.foursquare.com/v2/venues/explore?near=Oldham&client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826')
    .then((response) => {
      return response.json();
    }).then((myJson) => {
        console.log(JSON.stringify(myJson));
        this.setState({showingGiggs: myJson});
    }).catch(error => console.error('Error:', error));
  }


  render() {
    return (
      <div className="App">
        <header>
        <h1>Neighborhood Map</h1>
        </header>
      </div>
    );
  }
}

export default App;
