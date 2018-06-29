import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../profile/reducers';
import PropTypes from 'prop-types';
import styles from './GroupForm.css';

const defaultState = {
  teamName: '',
  description: '',
  type: '',
  image: '',
  private: false,
};

class GroupForm extends Component {

  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    group: PropTypes.object,
    label: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };

  static getDerivedStateFromProps({ group }, { edit }) {
    if(edit) return null;

    return {
      edit: group ? { ...group } : { ...defaultState }
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
          captains: [this.props.userProfile._id],
          members: [this.props.userProfile._id],
          // private: target.checked ? true : false
        }
      };
    });
  };

  handleSelect = ({ target }) => {
    this.setState(({ edit }) => {
      return {
        edit: {
          ...edit,
          type: target.value
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
    const categories = ['basketball', 'yoga', 'baseball', 'tennis', 'hiking', 'running', 'racquetball', 'frisbee', 'climbing', 'rafting', 'kayaking', 'swimming', 'golfing', 'football', 'ice hockey', 'volleyball', 'cross fit', 'softball', 'badminton', 'walking', 'chess', 'soccer'];
    const { teamName, description, image } = this.state.edit;
    const { label, onCancel } = this.props;

    return (
      <div className={styles.groupform}><form onSubmit={this.handleSubmit}>
        <input name="teamName" placeholder="Name" value={teamName} onChange={this.handleChange} required/>
        <select onChange={this.handleSelect}>
          <option>Activity</option>
          {categories.map(category => <option key={category} value={category}>
            {category}
          </option>)
          }
        </select>
        <input name="image" placeholder="Image" value={image} onChange={this.handleChange} required/>
        <textarea name="description" placeholder="Description" value={description} onChange={this.handleChange} required/>
        {/* <label>
          Private
          <input name="private" type="checkbox" onChange={this.handleChange}/>
        </label> */}
        <button type="submit">{label}</button>
        {onCancel && <button type="reset" onClick={onCancel}>Cancel</button>}
      </form>
      </div>
    );
  }
}

export default connect(
  state => ({ 
    userProfile: getUserProfile(state)
  }),
  null
)(GroupForm);