import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import PropTypes from 'prop-types';

const defaultState = {
  teamName: '',
  description: '',
  type: '',
  image: '',
  private: false,
};

class GroupForm extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
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
          captains: [this.props.user._id],
          members: [this.props.user._id],
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
    const { teamName, description, type, image } = this.state.edit;
    const { label, onCancel } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input name="teamName" placeholder="Name" value={teamName} onChange={this.handleChange}/>
        <input name="type" placeholder="Activity" value={type} onChange={this.handleChange}/>
        <input name="image" placeholder="Image" value={image} onChange={this.handleChange}/>
        <textarea name="description" placeholder="Description" value={description} onChange={this.handleChange}/>
        <label>
          Private
          <input name="private" type="checkbox" onChange={this.handleChange}/>
        </label>
        <button type="submit">{label}</button>
        {onCancel && <button type="reset" onClick={onCancel}>Cancel</button>}
      </form>
    );
  }
}

export default connect(
  state => ({ 
    user: getUser(state)
  }),
  null
)(GroupForm);