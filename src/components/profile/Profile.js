import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from './reducers';
import { loadProfile } from './actions';
import { getUser } from '../auth/reducers';
import { Link } from 'react-router-dom';

class Profile extends Component {

    static propTypes = {
      user: PropTypes.object,
      match: PropTypes.object,
      loadProfile: PropTypes.func.isRequired,
      profile: PropTypes.object
    };

    componentDidMount() {
      console.log('PROFILE', this.props.user);
      this.props.loadProfile(this.props.match.params.id);

    }

    render() {

      const { activities, bio, events, demographic, location, image, userId } = this.props.profile;
      if(!events) return null;

      return (
        <div>
          <h1>This is a Profile Component</h1>
          <h1>{userId.name}</h1>
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
  state => ({ 
    user: getUser(state),
    profile: getProfile(state) 
  }),
  { loadProfile }
)(Profile);

