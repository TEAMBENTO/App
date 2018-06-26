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
  private: '',
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
          [target.placeholder]: target.value
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
    const { teamName, description, type, image } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="teamName" value={teamName} onChange={this.handleChange}/>
          <input placeholder="type" value={type} onChange={this.handleChange}/>
          <input placeholder="image" value={image} onChange={this.handleChange}/>
          <textarea placeholder="description" value={description} onChange={this.handleChange}/>
          <label>
            Private
            <input type="checkbox" placeholder="private" value={this.state.private} onChange={this.handleChange}/>
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