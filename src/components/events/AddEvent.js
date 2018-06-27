import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { classnames } from '../helpers';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from './actions';
import { getEvents } from './reducers';
import { getUser } from '../auth/reducers';

const defaultFormState = {
  eventName: '',
  description: '',
  type: '',
  location: '',
  timeStart: '',
  timeEnd: ''
};

class AddEvent extends React.Component {

  static propTypes = {
    addEvent: PropTypes.func.isRequired,
    user: PropTypes.object
  };
  
  constructor(props) {
    super(props);
    this.state = {
      form: defaultFormState,
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.structureEventData(this.state);
  };

  structureEventData = state => {
    const formData = state.form;

    const { address, latitude, longitude } = state;

    const structuredData = {
      name: formData.eventName,
      description: formData.description,
      type: formData.type,
      location: {
        name: address,
        coords: {
          lat: latitude,
          lng: longitude
        }
      },
      time: {
        start: new Date(formData.timeStart),
        end: new Date(formData.timeEnd)
      },
      host: this.props.user._id // change to profile ID
    };
    console.log(structuredData);
    this.props.addEvent(structuredData);
  };

  handleFormChange = ({ target }) => {
    this.setState(({ form }) => {
      return {
        form: {
          ...form,
          [target.name]: target.value
        }
      };
    });
  };

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
    } = this.state;

    const { eventName, description, type, location, timeStart, timeEnd } = this.state.form;

    return (
      <div>
        <div>
          <h3>Create an Event</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Event Name:</label>
            <input type="text" name="eventName" value={eventName} onChange={this.handleFormChange}/>
            <label>Type of Activity:</label>
            <input type="text" name="type" value={type} onChange={this.handleFormChange}/>
            <label>Location:</label>
            <input type="text" name="location" value={location} onChange={this.handleFormChange}/>
            <label>Event Start:</label>
            <input type="text" name="timeStart" value={timeStart} onChange={this.handleFormChange}/>
            <label>Event End:</label>
            <input type="text" name="timeEnd" value={timeEnd} onChange={this.handleFormChange}/>
            <label>Description:</label>
            <textarea name="description" value={description} onChange={this.handleFormChange}/>
            <button type="submit">Create your Event</button>
          </form>
        </div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Location',
                      className: 'Demo__search-input',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      Reset
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Demo__suggestion-item', {
                        'Demo__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="Demo__dropdown-footer">
                      <div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Demo__geocode-result-header">Your location has been updated</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
              </div>
            ) : (
              <div>
                <div className="Demo__geocode-result-item--lat">
                  <label>Address:</label>
                  <span>{address}</span>
                </div>
                <div className="Demo__geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="Demo__geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}


export default connect(
  state => ({ 
    event: getEvents(state),
    user: getUser(state)
  }),
  { addEvent }
)(AddEvent);