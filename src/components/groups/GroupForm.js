import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGroup } from './actions';
import { getGroups } from './reducers';

const defaultState = {
  teamName: '',
  description: '',
  type: '',
  image: '',
  private: false,
};

class GroupForm extends Component {

  static propTypes = {
    addGroup: PropTypes.func.isRequired
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
          private: target.checked ? true : false
        }
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addGroup(this.state.edit);
    this.setState({
      edit: { ...defaultState }
    });
  };

  render() {
    const { teamName, description, type, image } = this.state.edit;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="teamName" placeholder="Name" value={teamName} onChange={this.handleChange}/>
          <input name="type" placeholder="Activity" value={type} onChange={this.handleChange}/>
          <input name="image" placeholder="Image" value={image} onChange={this.handleChange}/>
          <textarea name="description" placeholder="Description" value={description} onChange={this.handleChange}/>
          <label>
            Private
            <input name="private" type="checkbox" onChange={this.handleChange}/>
          </label>
          <button type="submit">Add Group</button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({ group: getGroups(state) }),
  { addGroup }
)(GroupForm);