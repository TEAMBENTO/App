import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleEvent } from './reducers';
import { loadEvent } from './actions';
import AddEvent from './AddEvent';
import { getUserProfile } from '../profile/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import { getUser } from '../auth/reducers';


class EventDetail extends Component {

  state = {
    editing: false
  };

  static propTypes = {
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired,
    user: PropTypes.object,
    userProfile: PropTypes.object,
    match: PropTypes.object,
    loadEvent: PropTypes.func.isRequired,
    singleEvent: PropTypes.object.isRequired
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleCancel = () => {
    this.setState({ editing: false });
  };
  
  componentDidMount() {
    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
    }
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
        {editing && <AddEvent editing={editing} id={_id} />}
        {!host ? <p>Hosted by: {host}</p> : null}
        {!group ? <p>Team: {group}</p> : null}
        <p>Activity: {type}</p>
        <p>Description: {description}</p>
        <p>Address: {location.name}</p>
        <p>Event Start: {timeStart.toLocaleString()}</p>
        <p>Event End: {timeEnd.toLocaleString()}</p>
        {!attendance ? <p>Attendants: {attendance}</p> : null}
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
  { loadEvent, queryProfile, loadUserProfile }
)(EventDetail);