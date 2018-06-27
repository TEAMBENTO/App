import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventListItem from './EventListItem';


class EventsList extends Component {

  static propTypes = {
    events: PropTypes.array
  };


  render() {

    const { events } = this.props;

    return (
      <ul>
        {events.map((event, i) => (
          <EventListItem key={i} event={event}/>
        ))}
      </ul>
    );
  }
}

export default EventsList;