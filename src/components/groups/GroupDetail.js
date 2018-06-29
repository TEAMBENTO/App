import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroup } from './reducers';
import { getUserProfile } from '../profile/reducers';
import { loadGroup, updateGroup, removeGroup, updateGroupMembers } from './actions';
import { loadEventsByGroup } from '../events/actions';
import { getEvents } from '../events/reducers';
import { getUser } from '../auth/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import GroupForm from './GroupForm';
import EventList from '../events/EventsList';
import ProfileList from '../profile/ProfileList';
import AddEvent from '../events/AddEvent';

class GroupDetail extends Component {

  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired,
    match: PropTypes.object,
    loadGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    updateGroup: PropTypes.func,
    removeGroup: PropTypes.func,
    loadEventsByGroup: PropTypes.func.isRequired,
    updateGroupMembers: PropTypes.func.isRequired,
    events: PropTypes.array,
    user: PropTypes.object,
  };

  state = {
    editing: false,
    canEdit: false,
    nonMember: true
  };

  componentDidMount() {
    const { loadGroup, loadEventsByGroup, match, user, queryProfile, loadUserProfile } = this.props;
    loadGroup(match.params.id)
      .then(({ payload }) => {
        if(user._id.toString() === payload.captains[0].userId._id.toString()) {
          this.setState({
            ...this.state,
            canEdit: true
          });
        }
        const isMember = payload.members.filter(member => member.userId._id === user._id);
        console.log('MEMBER', isMember);
        if(isMember.length) {
          this.setState({
            ...this.state,
            nonMember: false
          });
        }
        console.log(this.state);
      });
    loadEventsByGroup(match.params.id);
    queryProfile(user._id)
      .then(({ payload }) => {
        return loadUserProfile(payload[0]._id);
      });
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
    this.setState({
      ...this.state,
      nonMember: false
    });
  };
  
  render() {
    const { editing, canEdit, nonMember } = this.state;
    const { group, events } = this.props;
    const { teamName, image, description } = group;
    if(!group.captains) return null;

    return (
      <div>
        <h1>{teamName}</h1>
        <img src={image}/>
        <p>{description}</p>
        {nonMember && <button onClick={this.handleJoin}>Join</button>}
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
        {canEdit && <AddEvent groupId={group._id}/>}
        {events && <EventList events={events}/>}
        {group.members && <ProfileList profiles={group.members}/>}
      </div>
    );
  }
}

export default connect(
  state => ({ 
    user: getUser(state),
    group: getGroup(state),
    userProfile: getUserProfile(state),
    events: getEvents(state)
  }),
  { loadGroup, updateGroup, removeGroup, loadEventsByGroup, updateGroupMembers, queryProfile, loadUserProfile  }
)(GroupDetail);