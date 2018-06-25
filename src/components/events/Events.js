import React, { Component } from 'react';
import MapContainer from './MapContainer';



export default class Events extends Component {

  state = {
    portland: {
      lat: 45.51,
      lng: -122.65
    }
  };

  render() {
    return (
      <div>
        <MapContainer defaultCoords={this.state.portland} />
      </div>
    );
  } 
}