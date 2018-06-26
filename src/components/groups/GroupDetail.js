import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroup } from './reducers';
import { loadGroup, updateGroup } from './actions';
import { GroupForm } from './GroupForm';

class GroupDetail extends Component {

  state = {
    editing: false
  };

  static propTypes = {
    group: PropTypes.object,
    match: PropTypes.object,
    loadGroup: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadGroup(this.props.match.params.id);
  }

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleCancel = () => {
    this.setState({ editing: false });
  };

  handleUpdate = data => {
    this.props.updateGroup(data);
    this.setState({ editing: false });
  };
  

  render() {
    const { editing } = this.state;
    const { group } = this.prop;
    const { teamName, image, description } = group;

    return (
      <div>
        <h1>{teamName}</h1>
        <img src={image}/>
        <p>{description}</p>
        {editing || <button onClick={this.handleEdit}>✐</button>}
        {editing && 
          <div>
            <GroupForm
              label="Update"
              group={group}
              onComplete={this.handleUpdate}
              onCancel={this.handleCancel}
            />
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({ 
    group: getGroup(state)
  }),
  { loadGroup, updateGroup }
)(GroupDetail);