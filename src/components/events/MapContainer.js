import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
 

export class MapContainer extends Component {

  static propTypes = {
    defaultCoords: PropTypes.object
  };

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
      if(this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };


    render() {
      return (
        <Map google={this.props.google} zoom={14} initialCenter={this.props.defaultCoords}>
 
          <Marker
            onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            name={'Colonel Summers Park'}
            position={{  lat: 45.5155, lng: -122.6467  }} />
 
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      );
    }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmfqYnJinAb2l15myNeWVhZEHt4xS9-4U'
})(MapContainer);