import React, { Component } from 'react';
import EventsList from './EventsList';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import AddEvent from './AddEvent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadEvents } from './actions';
import { getEvents } from './reducers';
import MapContainer from './MapContainer';
import Autocomplete from './Autocomplete';


class Events extends Component {

  static propTypes = {
    loadEvents: PropTypes.func.isRequired,
    events: PropTypes.array
  };

  componentDidMount() {
    this.props.loadEvents();
  }

  state = {
    portland: {
      lat: 45.51,
      lng: -122.65
    }
  };

  render() {
    const { events } = this.props;
    if(!events) return null;

    console.log('EVENTS', events);

    return (
      <div>
        <h2>Events</h2>
        <ul>
          
        </ul>
        {/* <Switch>
          <Route path={`/events/list`} render={() => {return <EventsList events={events} />/>
        </Switch> */}
        <AddEvent/>
        <Autocomplete/>
        <MapContainer defaultCoords={this.state.portland} events={events}/>
      </div>
    );
  } 
}

export default connect(
  state => ({ events: getEvents(state) }),
  { loadEvents }
)(Events);