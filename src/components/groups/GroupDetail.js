import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroup } from './reducers';
import { getUserProfile } from '../profile/reducers';
import { loadGroup, updateGroup, removeGroup } from './actions';
import GroupForm from './GroupForm';

class GroupDetail extends Component {

  state = {
    editing: false
  };

  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    match: PropTypes.object,
    loadGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    updateGroup: PropTypes.func,
    removeGroup: PropTypes.func,
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

  handleJoin = () => {
    const { group, userProfile } = this.props;
    const profileIds = group.members.map(member => member._id);
    const updatedGroup = {
      ...group,
      members: [...profileIds, userProfile._id]
    };
    console.log('MEMBERS!!', updatedGroup.members);
    this.props.updateGroup(updatedGroup);
  };
  
  render() {
    const { editing } = this.state;
    const { group } = this.props;
    const { teamName, image, description } = group;
    if(!group) return null;


    return (
      <div>
        <h1>{teamName}</h1>
        <img src={image}/>
        <p>{description}</p>
        <button onClick={this.handleJoin}>Join</button>
        {editing || <button onClick={this.handleEdit}>✐</button>}
        <Link to={'/groups'}>
          <button onClick={() => removeGroup(group._id)}>X</button>
        </Link>
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
    group: getGroup(state),
    userProfile: getUserProfile(state)
  }),
  { loadGroup, updateGroup, removeGroup }
)(GroupDetail);