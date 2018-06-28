import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProfiles } from './actions';
import ProfileList from './ProfileList';
import { getProfiles } from './reducers';
import './Profiles.css';

class Profiles extends Component {
  static propTypes = {
    profiles: PropTypes.array,
    loadProfiles: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadProfiles();
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
    profiles: getProfiles(state)
  }),
  { loadProfiles }
)(Profiles);