import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
 

export class MapContainer extends Component {

  static propTypes = {
    defaultCoords: PropTypes.object
  };


  render() {
    return (
      <Map google={this.props.google} zoom={14} initialCenter={this.props.defaultCoords}>
 
        <Marker onClick={this.onMarkerClick}
          name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            {/* <h1>{this.state.selectedPlace.name}</h1> */}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmfqYnJinAb2l15myNeWVhZEHt4xS9-4U'
})(MapContainer);