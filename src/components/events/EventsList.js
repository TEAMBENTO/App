import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventListItem from './EventListItem';
import { connect } from 'react-redux';
import { getUserProfile } from '../profile/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import { getUser } from '../auth/reducers';
import styles from './EventsList.css';


class EventsList extends Component {

  static propTypes = {
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired,
    user: PropTypes.object,
    userProfile: PropTypes.object,
    events: PropTypes.array
  };

  componentDidMount() {
    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
    }
  }

  render() {
    const { events } = this.props;

    return (
      <ul className={styles.eventsList}>
        {events.map((event, i) => (
          <EventListItem key={i} event={event}/>
        ))}
      </ul>
    );
  }
}

export default connect(
  state => ({ 
    user: getUser(state),
    userProfile: getUserProfile(state)
  }),
  { queryProfile, loadUserProfile }
)(EventsList);