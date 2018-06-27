import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from './actions';
import { getEvents } from './reducers';
import { getUser } from '../auth/reducers';
import Autocomplete from './Autocomplete';

const defaultState = {
  eventName: '',
  description: '',
  type: '',
  location: '',
  timeStart: '',
  timeEnd: ''
};

class AddEvent extends Component {

  static propTypes = {
    addEvent: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  state = {
    form: defaultState
  };
  

  handleChange = ({ target }) => {
    this.setState(({ form }) => {
      return {
        form: {
          ...form,
          [target.name]: target.value
        }
      };
    });
  };


  handleSubmit = event => {
    event.preventDefault();
    this.structureEventData(this.state.form);
  };

  structureEventData = formData => {
    const structuredData = {
      name: formData.eventName,
      description: formData.description,
      type: formData.type,
      location: formData.location,
      time: {
        start: new Date(formData.timeStart),
        end: new Date(formData.timeEnd)
      },
      host: this.props.user._id // change to profile ID
    };
    this.props.addEvent(structuredData);
  };

  render() {

    const { eventName, description, type, location, timeStart, timeEnd } = this.state.form;

    return (
      <div>
        <h3>Create an Event</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Event Name:</label>
          <input type="text" name="eventName" value={eventName} onChange={this.handleChange}/>
          <label>Type of Activity:</label>
          <input type="text" name="type" value={type} onChange={this.handleChange}/>
          <label>Location:</label>
          <Autocomplete/>
          <input type="text" name="location" value={location} onChange={this.handleChange}/>
          <label>Event Start:</label>
          <input type="text" name="timeStart" value={timeStart} onChange={this.handleChange}/>
          <label>Event End:</label>
          <input type="text" name="timeEnd" value={timeEnd} onChange={this.handleChange}/>
          <label>Description:</label>
          <textarea name="description" value={description} onChange={this.handleChange}/>
          <button type="submit">Create your Event</button>
        </form>
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