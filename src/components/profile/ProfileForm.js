import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileForm.css';

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

      handleSelect = ({ target }) => {
        this.setState(() => {
          return {
            ...this.state,
            activities: target.value
          };
        });
      };
    
      handleSubmit = event => {
        event.preventDefault();
        this.props.onComplete(this.state);
      };

      render() {
        const categories = ['basketball', 'yoga', 'baseball', 'tennis', 'hiking', 'running', 'racquetball', 'frisbee', 'climbing', 'rafting', 'kayaking', 'swimming', 'golfing', 'football', 'ice hockey', 'volleyball', 'cross fit', 'softball', 'badminton', 'walking', 'chess', 'soccer'];
        const { bio, demographic, location, image } = this.state;
        const { label, onCancel } = this.props;

        return (
          <form className={styles.profileForm} onSubmit={this.handleSubmit}>
            <select onChange={this.handleSelect}>
              <option>Activity</option>
              {categories.map(category => <option key={category} value={category}>
                {category}
              </option>)
              }
            </select>
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