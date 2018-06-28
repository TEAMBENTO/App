import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroup } from './reducers';
import { getUserProfile } from '../profile/reducers';
import { loadGroup, updateGroup, removeGroup, updateGroupMembers } from './actions';
import { loadEventsByGroup } from '../events/actions';
import { getEvents } from '../events/reducers';
import GroupForm from './GroupForm';
import EventList from '../events/EventsList';

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
    loadEventsByGroup: PropTypes.func.isRequired,
    updateGroupMembers: PropTypes.func.isRequired,
    events: PropTypes.array
  };

  componentDidMount() {
    const { loadGroup, loadEventsByGroup, match } = this.props;
    loadGroup(match.params.id);
    loadEventsByGroup(match.params.id);
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
    const { group, userProfile, updateGroupMembers } = this.props;
    const profileIds = group.members.map(member => member._id);
    const updatedMembers = {
      members: [...profileIds, userProfile._id]
    };
    updateGroupMembers(updatedMembers);
  };
  
  render() {
    const { editing } = this.state;
    const { group, events } = this.props;
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
        {events && <EventList events={events}/>}
      </div>
    );
  }
}

export default connect(
  state => ({ 
    group: getGroup(state),
    userProfile: getUserProfile(state),
    events: getEvents(state)
  }),
  { loadGroup, updateGroup, removeGroup, loadEventsByGroup, updateGroupMembers }
)(GroupDetail);