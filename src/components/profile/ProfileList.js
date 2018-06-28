import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProfiles, loadUserProfile, queryProfile } from './actions';
import { getUser } from '../auth/reducers';
import { Link } from 'react-router-dom';
import { getProfiles, getUserProfile } from './reducers';

class ProfileList extends Component {

    static propTypes = {
      profiles: PropTypes.array,
    };

    render() {
      const { profiles } = this.props;
      if(!profiles) return null;

      return (
        <ul id="profile-grid">
          {profiles.map(profile => <Link key={profile._id} to={`/profile/${profile._id}`}>
            <p><img src={profile.image}></img></p>
          </Link>)}
        </ul>
      ); 
    } 
}

export default ProfileList;
