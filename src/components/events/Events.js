import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Autocomplete from './Autocomplete';



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
        <Autocomplete/>
        <MapContainer defaultCoords={this.state.portland} />
      </div>
    );
  } 
}