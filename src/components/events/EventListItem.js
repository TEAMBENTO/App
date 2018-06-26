import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EventListItem extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired
  };


  render() {
    const { event } = this.props;
    const { attendance, description, group, host, location, name, time, type, _id } = event;

    return (
      <li>
        <h2>{name}</h2>
        <p>Hosted by: {host}</p>
        <p>Activity: {type}</p>
        <p>Description: {description}</p>
        <p>Starting at: {time.start}</p>
        <p>Ending at: {time.end}</p>
        
      </li>
    );
  }
}

export default EventListItem;