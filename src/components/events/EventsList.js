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

  state = {
    filter: 'allActivities'
  };

  componentDidMount() {
    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
    }
  }

  filterCategories = filter => {
    const { events } = this.props;
    const filteredList = events.filter(event => event.type === filter);
    return filteredList;
  };

  handleSelect = ({ target }) => {
    this.setState(() => {
      return {
        ...this.state,
        filter: target.value
      };
    });
  };

  render() {
    const categories = ['basketball', 'yoga', 'baseball', 'tennis', 'hiking', 'running', 'racquetball', 'frisbee', 'climbing', 'rafting', 'kayaking', 'swimming', 'golfing', 'football', 'ice hockey', 'volleyball', 'cross fit', 'softball', 'badminton', 'walking', 'chess', 'soccer'];
    const { events } = this.props;
    const { filter } = this.state;

    const eventList = filter === 'allActivities' ? events : this.filterCategories(filter);

    return (
      <div>
        <div>
          <h3>Filter Events by Activity</h3>
          <select onChange={this.handleSelect}>
            <option value="allActivities"> All Activity</option>
            {categories.map(category => <option key={category} value={category}>
              {category}
            </option>)
            }
          </select>
        </div>
        <ul className={styles.eventsList}>
          {eventList.map((event, i) => (
            <EventListItem key={i} event={event}/>
          ))}
        </ul>
      </div>
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