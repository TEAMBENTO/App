import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileForm extends Component {

    static propTypes = {
      profile: PropTypes.object,
      label: PropTypes.string.isRequired,
      onComplete: PropTypes.func.isRequired,
      onCancel: PropTypes.func,
    };
    
      state = { ...this.props.profile };
    
      handleChange = event => {
        event.preventDefault();
        const { target } = event;
        this.setState(() => {
          return {
            ...this.state,
            [target.name]: target.value,
          };
        });
      };
    
      handleSubmit = event => {
        event.preventDefault();
        this.props.onComplete(this.state);
      };

      render() {

        const { activities, bio, demographic, location, image } = this.state;
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