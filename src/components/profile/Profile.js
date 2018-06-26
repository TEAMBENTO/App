import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from './reducers';
import { loadProfile } from './actions';
import { Link } from 'react-router-dom';

class Profile extends Component {

    static propTypes = {
      loadProfile: PropTypes.func.isRequired,
      profile: PropTypes.object
    };

    componentDidMount() {
      this.props.loadProfile('5b3177d2eff9351db09ab4be');
    }

    render() {

      const { activities, bio, events, demographic, location, image } = this.props.profile;
      if(!events) return null;

      return (
        <div>
          <h1>This is a Profile Component</h1>
          {image ? <img src = {image}/> : <p>Add an image</p>}
          {bio ? <p>This is me:{bio}</p> : <p>No bio added, tell us about yourself!</p> }
          {demographic ? <p>demographic:{demographic}</p> : <p>blank</p>}
          {location ? <p>Location: {location}</p> : <p>Fill in your location!</p>}
          {activities ? <p>{activities}</p> : <p>No activities added</p>}
          {events.map(event => <Link key={event._id} to={`/events/${event._id}`}>
          This is an event! Event called: {event.name}
          </Link>)}

        </div>

      ); 
    } 
}

export default connect(
  state => ({ profile: getProfile(state) }),
  { loadProfile }
)(Profile);

