import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

export class MapContainer extends Component {

  static propTypes = {
    defaultCoords: PropTypes.object,
    google: PropTypes.object,
    events: PropTypes.array
  };

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    fields: {
      location: {
        lat: 45.5231,
        lng: -122.6814
      }
    }
  };

  async componentDidMount() {
    const { lat, lng } = await this.getCurrentLocation();
    this.setState(prev => ({
      fields: {
        ...prev.fields,
        location: {
          lat,
          lng
        }
      },
      currentLocation: {
        lat,
        lng
      }
    }));
  }

  getCurrentLocation() {
    if(navigator && navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });
        });
      });
    }
    return Promise.resolve({
      lat: 0,
      lng: 0
    });
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = () => {
    if(this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {

    const { events } = this.props;

    return (
      <Map google={this.props.google}
        style={{
          width: '100%',
          height: '90%'
        }}
        zoom={14}
        initialCenter={this.state.fields.location}
        center={this.state.fields.location}>

        {events.map((event) => (
          <Marker 
            onClick={this.onMarkerClick}
            key={event._id}
            name={event.name}
            activity={event.type}
            title={event.description}
            description={event.description}
            time={(new Date(event.time.start)).toLocaleString()}
            event={event}
            position={event.location.coords}
            id={event._id}
          />
        ))}
 
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <p>Activity: {this.state.selectedPlace.activity}</p>
            <p>Description: {this.state.selectedPlace.description}</p>
            <p>Event Start: {this.state.selectedPlace.time}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDmfqYnJinAb2l15myNeWVhZEHt4xS9-4U'
})(MapContainer);