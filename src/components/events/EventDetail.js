import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleEvent } from './reducers';
import { loadEvent, updateEventAttendants } from './actions';
import AddEvent from './AddEvent';
import { Link } from 'react-router-dom';
import { getUserProfile } from '../profile/reducers';
import ProfileList from '../profile/ProfileList';


class EventDetail extends Component {

  state = {
    editing: false
  };

  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    match: PropTypes.object,
    loadEvent: PropTypes.func.isRequired,
    singleEvent: PropTypes.object.isRequired,
    updateEventAttendants: PropTypes.func.isRequired
  };

  handleJoin = () => {
    const { singleEvent, userProfile, updateEventAttendants } = this.props;
    const profileIds = singleEvent.attendance.map(attendee => attendee._id);
    const updatedAttendants = {
      _id: this.props.singleEvent._id,
      attendance: [...profileIds, userProfile.userId]
    };
    updateEventAttendants(updatedAttendants);
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleCancel = () => {
    this.setState({ editing: false });
  };
  
  componentDidMount() {
    this.props.loadEvent(this.props.match.params.id);
  }

  render() {
    if(!this.props.singleEvent._id) return null;
    const { editing } = this.state;
    const { attendance, description, group, host, location, name, time, type, _id } = this.props.singleEvent;

    const { start, end } = time;

    const timeStart = new Date(start);
    const timeEnd = new Date(end);

    return (
      <div>
        <h2>{name}</h2>{editing || <button onClick={this.handleEdit}>✐</button>}
        <button onClick={this.handleJoin}>Join</button>
        {editing && <AddEvent editing={editing} id={_id} />}
        {host.length ? <p>Hosted by: {host.map(hostee => <Link key={hostee._id}to={`/profiles/${hostee._id}`}>{hostee.userId.name}</Link>)}</p> : null}
        {group.length ? <p>Team: {group}</p> : null}
        <p>Activity: {type}</p>
        <p>Description: {description}</p>
        <p>Address: {location.name}</p>
        <p>Event Start: {timeStart.toLocaleString()}</p>
        <p>Event End: {timeEnd.toLocaleString()}</p>
        {attendance && <ProfileList profiles={attendance}/>}
      </div>
    );
  }
}

export default connect(
  state => ({
    singleEvent: getSingleEvent(state),
    userProfile: getUserProfile(state)
  }),
  { loadEvent, updateEventAttendants }
)(EventDetail);