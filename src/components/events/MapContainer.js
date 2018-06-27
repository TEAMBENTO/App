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
        lat: 45.51,
        lng: -122.65
      }
    }
  };

  async componentDidMount() {
    const { lat, lng } = await this.getcurrentLocation();
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

  getcurrentLocation() {
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
    return {
      lat: 0,
      lng: 0
    };
  }

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

    const { events } = this.props;
    const { attendance, name, description, group, host, location, time, type, _id } = events;

    return (
      <Map google={this.props.google}
        style={{
          width: '90%',
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
          />
        ))}
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