import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultState = {
  activities: '',
  bio: '',
  demographic: '',
  location: '',
  image: '',
};

class ProfileForm extends Component {

    static propTypes = {
      profile: PropTypes.object,
      label: PropTypes.string.isRequired,
      onComplete: PropTypes.func.isRequired,
      onCancel: PropTypes.func
    };

    static getDerivedStateFromProps({ profile }) {
      return {
        ...profile 
      };
    }
    
      state = {};
  

      handleChange = ({ target }) => {
        this.setState({
          [target.name]: target.value
        });
      };
    
      handleSubmit = event => {
        event.preventDefault();
        this.props.onComplete(this.state);
      };

      render() {
        const { activities, bio, demographic, location, image } = this.props.profile;
        const { label, onCancel } = this.props;

        return (
          <form onSubmit={this.handleSubmit}>
            <input name="activities" placeholder="Activity" value={activities} onChange={this.handleChange}/>
            <input name="bio" placeholder="Describe Yourself" value={bio} onChange={this.handleChange}/>
            <input name="demographic" placeholder="How do you Identify?" value={demographic} onChange={this.handleChange}/>
            <input name="location" placeholder="Location" value={location} onChange={this.handleChange}/>
            <input name="image" placeholder="Profile Image" value={image} onChange={this.handleChange}/>
            <button type="submit">{label}</button>
            {onCancel && <button type="reset" onClick={onCancel}>Cancel</button>}
          </form>
        );
      }
}

export default ProfileForm;