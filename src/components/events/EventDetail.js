import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleEvent } from './reducers';
import { loadEvent, updateEventAttendants } from './actions';
import AddEvent from './AddEvent';
import { getUserProfile } from '../profile/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import { getUser } from '../auth/reducers';
import { Link } from 'react-router-dom';
import ProfileList from '../profile/ProfileList';



class EventDetail extends Component {

  state = {
    editing: false,
    canEdit: false
  };

  static propTypes = {
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired,
    user: PropTypes.object,
    userProfile: PropTypes.object,
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
      attendance: [...profileIds, userProfile._id]
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
    const { loadEvent, match } = this.props;
    

    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        })
        .then(({ payload }) => {
          loadEvent(match.params.id)
            .then(event => {
              if(payload._id === event.payload.host[0]._id) {
                this.setState({
                  ...this.state,
                  canEdit: true
                });
              }
            });
        });
    }
    


  }

  render() {
    if(!this.props.singleEvent._id) return null;
    const { editing, canEdit } = this.state;
    const { attendance, description, group, host, location, name, time, type, _id } = this.props.singleEvent;

    const { start, end } = time;

    const timeStart = new Date(start);
    const timeEnd = new Date(end);

    return (
      <div>
        <h2>{name}</h2>
        {canEdit && <div>
          {editing || <button onClick={this.handleEdit}>✐</button>} </div>}
        <button onClick={this.handleJoin}>Join</button>
        {editing && <AddEvent editing={editing} id={_id} />}
        {/* {host[0].userId.name ? <p>Hosted by: {host[0].userId.name} </p> : null} */}
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
    user: getUser(state),
    userProfile: getUserProfile(state),
    singleEvent: getSingleEvent(state)
  }),
  { loadEvent, queryProfile, updateEventAttendants, loadUserProfile }
)(EventDetail);