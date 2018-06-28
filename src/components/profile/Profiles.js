import React, { Component } from 'react';
import ProfileList from './ProfileList';
import './Profiles.css';

export default class Profiles extends Component {
  render() {
    return (
      <div id = "Profile-list">
        <ProfileList/>
      </div>
    );
  }
}
