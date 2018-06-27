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
      onComplete: PropTypes.isRequired,
      onCancel: PropTypes.func
    };

    static getDerivedStateFromProps({ profile }, { edit }) {
      if(edit) return null;
    
      return {
        edit: profile ? { ...profile } : { ...defaultState }
      }; 
    }
    
      state = {
        edit: null
      };
    
      handleChange = ({ target }) => {
        this.setState(({ edit }) => {
          return {
            edit: {
              ...edit,
              [target.name]: target.value,
              private: target.checked ? true : false
            }
          };
        });
      };
    
      handleSubmit = event => {
        event.preventDefault();
        this.props.onComplete(this.state.edit);
        this.setState({
          edit: { ...defaultState }
        });
      };

      render() {
        const { activities, bio, demographic, location, image } = this.state.edit;
        const { label, onCancel } = this.props;

        return (
          <form onSubmit={this.handleSubmit}>
            <input name="activites" placeholder="Activity" value={activities} onChange={this.handleChange}/>
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