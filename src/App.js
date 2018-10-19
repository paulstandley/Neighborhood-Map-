import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import DataFile from './assets/DataFile.json';
import ListApp from './ListApp';
import MapApp from './MapApp';
import './App.css';

/*
# __TODO LIST__
* change id on li list or map markes to make ids unic 
* sort out css for API fecth display
* set map back to desktop css 
* sort out moblie css
* sw ? README : do one
* sort out aria role
* a11y clean up
* make Error handeler
* clean up console.log dir
* change classes with no state to functions
* make sure README and comments clear and understandable 
*/

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      foursquare: {},
      DATAFILE: DataFile.response.groups[0].items.sort(sortBy('venue.name')),
      query: '',
      filtered: {},
      pick: {},
      listActiveTargetMarker: {},
      listActiveTargetAddress: {},
      listActiveTargetName: {},
      listTargetIndex: null,
      listActive: false,
    };
    this.updateQueryHandeler = this.updateQueryHandeler.bind(this);
    this.clicked = this.clicked.bind(this);
    this.closeList = this.closeList.bind(this);
  }

  
  /*
https://github.com/stoyan/fail/commit/41cc6ef626abef0ebee64d8f0c9f882c6d5ae144
  
  static propTypes = {
    foursquare: propTypes.object.isRequired,
    updateQueryHandeler: propTypes.func.isRequired,
    filteredDATA: propTypes.array.isRequired,
    query: propTypes.string.isRequired
  }*/


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

  }

  componentWillUpdate() {
 

  }

/* event handeler */  
  updateQueryHandeler = (query) => {
    this.setState({ query: query.trim()} );
        
  }

  closeList = (evt) => {
    this.setState({ 
      pick: {},
      listActiveTargetMarker: {},
      listActiveTargetAddress: {},
      listActiveTargetName: {},
      listTargetIndex: null,
      listActive: false,
    });
  }

/* model https://github.com/reactjs/react-modal and https://reactjs.org/community/model-management.html https://www.npmjs.com/package/react-modal-bootstrap https://codeburst.io/modals-in-react-f6c3ff9f4701 */
  clicked = (evt) => {
    console.log(evt)
    console.log(this.state.listTargetIndex);
    
    if(evt.className === 'marker') {
    this.setState({
      listActiveTargetName: evt.name,
      listActiveTargetMarker: evt,
      listActiveTargetAddress: evt.title,
      listTargetIndex: Number(evt.id),
      listActive: true
    })  
      console.log(`Map Event`);
      console.log(evt);
      console.log(evt.id)
      console.log(evt.name);//value for compare
      console.log(evt.title);
      console.log(evt.animation);
      if(this.state.listTargetIndex !== null) {
        let num0 = this.state.listTargetIndex;
        console.log(num0)
        let picked0 = this.state.DATAFILE[num0].venue.id;
        console.log(picked0);
         
        fetch(`https://api.foursquare.com/v2/venues/${picked0}/photos?client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826`).then((response) => {
        return response.json();
      }).then((pick) => {
        this.setState({pick})
      }).catch(error => console.error('Error:', error));
      }
// list display
    }else{
    
    if(evt !== undefined) {

      this.setState({ 
        listActiveTargetMarker: evt.currentTarget,
        listActiveTargetAddress: evt.currentTarget.childNodes[2].innerText,
        listActiveTargetName: evt.currentTarget.childNodes[1].innerText,
        listActive: true,
        listTargetIndex: Number(evt.currentTarget.id)
       })
       
      console.log(`List Event`);
      console.log(evt);
      console.log(evt.target.innerText)//value for compare
      console.log(evt.currentTarget.childNodes[2].innerText)
      console.log(Number(evt.currentTarget.id))// compare with index no duplicates
      console.log(this.state.listTargetIndex)

      let num1 = Number(evt.currentTarget.id);
      console.log(num1);
      let picked1 = this.state.DATAFILE[num1].venue.id;
      console.log(picked1);
     
      fetch(`https://api.foursquare.com/v2/venues/${picked1}/photos?client_id=AZCVJUXLZ4L2HW1W5XXE5AQBHZVXFWFK3PASLVFJGL4BVRXH&client_secret=VP5GYXQT3E3IDSSOEV5BWCKIAUGLJ4D5RX3NU2B305NSDT0P&v=20180826`).then((response) => {
      return response.json();
    }).then((pick) => {
      this.setState({pick})
    }).catch(error => console.error('Error:', error));
    
  }
    }

  };

  queryMethod() {
    let filtered;
    if (this.state.query) {
      
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      //filtered = this.state.venue.filter((places) => match.test(places.name));
      filtered = this.state.foursquare.filter((value) => match.test(value.venue.name));
      console.log(filtered);
      filtered.sort(sortBy('venue.name'));
      DataFile.response.groups[0].items.sort(sortBy('venue.name'));
      //console.log(filtered[0].venue.name)
      //console.log(filtered[1].venue.id)
    }
    else {
      filtered = this.state.DataFile;
    }
    
    return filtered;

  }

  render() {
    /*
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
    */
   let filtered = this.queryMethod();
    
   return (
     <div className="App">
       <header>
         <h1>Neighborhood Map</h1>
       </header>
       
       {filtered !== undefined ? // display filtered list and map markers
       <main id="mainPage" className="main-page">
         <section id="sectionList" className="section-list">
           <input type="text" 
           aria-label="text"
           aria-required="true"
           id="sectionInput" 
           className="section-input" 
           placeholder="Filter foursquare list"
           value={this.state.query}
           onChange={(event) => this.updateQueryHandeler(event.target.value)}/>
           <ListApp closeList={this.closeList} start={this.state.DATAFILE} venue={filtered} pick={this.state.pick} clicked={this.clicked} AppData={this.state}/>
         </section>
         <section id="sectionMap" className="section-map">
           <MapApp closeList={this.closeList} start={this.state.DATAFILE} venue={filtered} clicked={this.clicked} AppData={this.state} />
         </section>
        </main>

       :  // display start list and all markers
       <main id="mainPage" className="main-page">
         <section id="sectionList" className="section-list">
           <input type="text" 
           aria-label="text"
           aria-required="true"
           id="sectionInput" 
           className="section-input" 
           placeholder="Filter foursquare list"
           value={this.state.query}
           onChange={(event) => this.updateQueryHandeler(event.target.value)}/>
          <ListApp closeList={this.closeList} start={this.state.DATAFILE} venue={filtered} pick={this.state.pick} clicked={this.clicked} AppData={this.state}/>
          </section>
        <section id="sectionMap" className="section-map">
          <MapApp closeList={this.closeList} start={this.state.DATAFILE} venue={filtered} clicked={this.clicked} AppData={this.state} />
        </section>
      </main>
        
      }       
     
     </div>
   );
    
  }

}

export default App;



    

      
    
