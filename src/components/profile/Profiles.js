import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { loadProfiles, loadUserProfile, queryProfile } from './actions';
import ProfileList from './ProfileList';
import { getProfiles, getUserProfile } from './reducers';
import './Profiles.css';

class Profiles extends Component {
  static propTypes = {
    user: PropTypes.object,
    profiles: PropTypes.array,
    loadProfiles: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadProfiles();
    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
    }
  }

  render() {
    const { profiles } = this.props;
    return (
      <div id = "Profile-list">
        <ProfileList profiles={profiles}/>
      </div>
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
)(Profiles);