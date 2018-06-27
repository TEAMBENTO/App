import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class EventListItem extends Component {

  static propTypes = {
    event: PropTypes.object.isRequired
  };


  render() {
    const { event } = this.props;
    const { attendance, description, group, host, location, name, time, type, _id } = event;

    const { start, end } = time;

    const timeStart = new Date(start);
    const timeEnd = new Date(end);

    return (
      <li>
        <Link to={`/events/${_id}/`}><h2>{name}</h2></Link>
        {!host ? <p>Hosted by: {host}</p> : null}
        {!group ? <p>Team: {group}</p> : null}
        <p>Activity: {type}</p>
        <p>Description: {description}</p>
        <p>Location: {location}</p>
        <p>Event Start: {timeStart.toLocaleString()}</p>
        <p>Event End: {timeEnd.toLocaleString()}</p>
        {!attendance ? <p>Attendants: {attendance}</p> : null}
      </li>
    );
  }
}

export default EventListItem;