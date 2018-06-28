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
import ProfileList from '../profile/ProfileList';
import AddEvent from '../events/AddEvent';

class GroupDetail extends Component {

  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    match: PropTypes.object,
    loadGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    updateGroup: PropTypes.func,
    removeGroup: PropTypes.func,
    loadEventsByGroup: PropTypes.func.isRequired,
    updateGroupMembers: PropTypes.func.isRequired,
    events: PropTypes.array,
  };

  state = {
    editing: false,
    canEdit: false
  };

  componentDidMount() {
    const { loadGroup, loadEventsByGroup, match, userProfile } = this.props;
    loadGroup(match.params.id)
      .then(group => {
        if(userProfile._id.toString() === group.payload.captains[0]._id.toString()) {
          this.setState({
            ...this.state,
            canEdit: true
          });
        }
      });
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
      _id: group._id,
      members: [...profileIds, userProfile._id]
    };
    updateGroupMembers(updatedMembers);
  };
  
  render() {
    const { editing, canEdit } = this.state;
    const { group, events } = this.props;
    const { teamName, image, description } = group;
    if(!group.captains) return null;

    return (
      <div>
        <h1>{teamName}</h1>
        <img src={image}/>
        <p>{description}</p>
        <button onClick={this.handleJoin}>Join</button>
        {canEdit && <div>
          {editing || <button onClick={this.handleEdit}>✐</button>}
          <Link to={'/groups'}>
            <button onClick={() => removeGroup(group._id)}>X</button>
          </Link>
        </div>}
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
        <AddEvent groupId={group._id}/>
        {events && <EventList events={events}/>}
        {group.members && <ProfileList profiles={group.members}/>}
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