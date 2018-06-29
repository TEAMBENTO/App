import React, { Component } from 'react';
import EventsList from './EventsList';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import AddEvent from './AddEvent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadEvents } from './actions';
import { getEvents } from './reducers';
import { getCheckedAuth } from '../auth/reducers';
import MapContainer from './MapContainer';
import EventDetail from './EventDetail';
import { getUserProfile } from '../profile/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import { getUser } from '../auth/reducers';
import PrivateRoute from '../app/PrivateRoute';
import styles from './Events.css';



class Events extends Component {

  static propTypes = {
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired,
    user: PropTypes.object,
    userProfile: PropTypes.object,
    loadEvents: PropTypes.func.isRequired,
    checkedAuth: PropTypes.func.isRequired,
    events: PropTypes.array
  };

  componentDidMount() {
    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
    }
    this.props.loadEvents();
  }

  state = {
    portland: {
      lat: 45.51,
      lng: -122.65
    }
  };

  render() {
    const { events, checkedAuth } = this.props;
    if(!events) return null;

    return (
      <div>
        <h2>Events</h2>
        <ul className = {styles}>
          <li><Link to={'/events/list'}>All Events</Link></li>
          <li><Link to={'/events/new'}>Add a New Event</Link></li>
          <li><Link to={'/events/map'}>Map View</Link></li>
        </ul>
        { checkedAuth && 
        <Switch>
          <Route exact path={'/events/list'} render={() => {return <EventsList events={events}/>;}} />
          <Route path={'/events/new'} render={() => {return <AddEvent/>;}} />
          <Route path={'/events/map'} render={() => {return <MapContainer defaultCoords={this.state.portland} events={events}/>;}} />
          <PrivateRoute exact path="/events/:id" component={EventDetail}/>
          <Redirect to="/events/map"/>
        </Switch>
        }
      </div>
    );
  } 
}

export default connect(
  state => ({ 
    events: getEvents(state),
    user: getUser(state),
    userProfile: getUserProfile(state),
    checkedAuth: getCheckedAuth(state), 
  }),
  { loadEvents, queryProfile, loadUserProfile }
)(Events);