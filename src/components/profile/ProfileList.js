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
      user: PropTypes.object,
      userProfile: PropTypes.object,
      match: PropTypes.object,
      loadProfiles: PropTypes.func.isRequired,
      loadUserProfile: PropTypes.func.isRequired,
      queryProfile: PropTypes.func.isRequired,
      // profile: PropTypes.object
    };

    componentDidMount() {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
      this.props.loadProfiles();
    }

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

export default connect(
  state => ({ 
    user: getUser(state),
    profiles: getProfiles(state),
    userProfile: getUserProfile(state)
  }),
  { loadProfiles, queryProfile, loadUserProfile }
)(ProfileList);