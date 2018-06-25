import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from './reducers';
import { loadProfile } from './actions';

class Profile extends Component {

    static propTypes = {
      loadProfile: PropTypes.func.isRequired,
      profile: PropTypes.object
    };

    componentDidMount() {
      this.props.loadProfile('5b3177d2eff9351db09ab4be');
    }

    render() {

      const { profile } = this.props;
      if(!profile) return null;
      // const { activites, bio, demographic, location, image } = this.state
    
      return (
        <div>
          <h1>This is a Profile Component</h1>
          <p>{profile.activities}</p>
          <img src= "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=266b96f7a75b99ba8180666166205ebc&auto=format&fit=crop&w=631&q=80"></img>
        </div>

      ); 
    } 
}

export default connect(
  state => ({ profile: getProfile(state) }),
  { loadProfile }
)(Profile);

