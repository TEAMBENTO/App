import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProfiles } from './actions';
import { getUser } from '../auth/reducers';
import { Link } from 'react-router-dom';
import { getProfiles } from './reducers';

class Profile extends Component {

    static propTypes = {
      profiles: PropTypes.array,
      user: PropTypes.object,
      match: PropTypes.object,
      loadProfiles: PropTypes.func.isRequired,
      profile: PropTypes.object
    };

    componentDidMount() {
      this.props.loadProfiles();
    }

    render() {

      const { profiles } = this.props;
      if(!profiles) return null;

      console.log('PROFILES', profiles);

      return (
        <div>
          <ul>
            {profiles.map(profile => <li key={profile._id}>
            Username: {profile.userId.name}</li>
            )}
          </ul>
        </div>

      ); 
    } 
}

export default connect(
  state => ({ 
    user: getUser(state),
    profiles: getProfiles(state)
  }),
  { loadProfiles }
)(Profile);