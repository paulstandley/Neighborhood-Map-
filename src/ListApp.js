import React, { Component } from 'react';
import Modal from 'react-modal';
import './index.css';
import "./App.css";

const modalStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ListApp extends Component {
  
  state = {
    modalIsOpen: false,
    listActive: true
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = 'black';
    this.subtitle.style.fontSize = '30px';

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      listActive: false
    });
  }
// when you click on map marker should bounce and stop the other one :)   
  render() {
   console.log(this.props.AppData)
    return ( 
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.clicked}
          onRequestClose={this.closeModal}
          style={modalStyles}
          className="modal"
          overlayClassName="overlay"
          contentLabel="modal" >
          <div className="divModal">
            <h2 ref={subtitle => this.subtitle = subtitle}></h2>

            <button onClick={this.closeModal}>close</button>
          </div>
        </Modal>
        <h2>OLDHAM</h2> 
        <div>
          <ol>
            {this.props.query !== '' ? // when text input is not an empty string 
            this.props.venue.map((current, index, array) => (
              <li key={index + 354352 + index} >
  
              {current.venue !== undefined ? // make sure object is not undefined 
              <span id={`${index}`} onClick={this.props.clicked}>
             
                <img src="https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png" alt="planet" width="16" height="16"></img>
                <h3><strong>{current.venue.name}</strong></h3>
                <h3>{array[index].venue.location.address}</h3>
              </span> : console.log(current.name)}
                
              </li>
            ))
            : // display all list with JSON DATAFILE or foursquare
            this.props.foursquare.map((current, index, array) => (
              <li key={index + 348734 + index}>
              
              {current.venue !== undefined ? // make sure object is not undefined
              <span id={`${index}`} onClick={this.props.clicked}>
            
                <img src="https://res.cloudinary.com/pieol2/image/upload/v1538509364/planet.png" alt="planet" width="16" height="16"></img>
                <h3><strong>{current.venue.name}</strong></h3>
                <h3>{array[index].venue.location.address}</h3>
              </span> : console.log(current.name)}
                
              </li>
            )) }
          </ol>
        </div>
      </div>
     );
  }
}
 
export default ListApp;