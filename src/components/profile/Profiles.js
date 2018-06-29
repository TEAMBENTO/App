import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { loadProfiles, loadUserProfile, queryProfile } from './actions';
import ProfileList from './ProfileList';
import { getProfiles, getUserProfile } from './reducers';
import styles from './Profiles.css';

class Profiles extends Component {
  static propTypes = {
    user: PropTypes.object,
    profiles: PropTypes.array,
    loadProfiles: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired
  };

  state = {
    filter: 'allActivities'
  };

  componentDidMount() {
    this.props.loadProfiles();
    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
    }
  }

  filterCategories = filter => {
    const { profiles } = this.props;
    const filteredList = profiles.filter(event => event.activities === filter);
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
    const { profiles } = this.props;
    const { filter } = this.state;

    const profileList = filter === 'allActivities' ? profiles : this.filterCategories(filter);

    return (
      <div className={styles.profiles} >
        <div className="drop-down">
          <h3>Filter Profiles by Activity</h3>
          <select onChange={this.handleSelect}>
            <option value="allActivities"> All Activities</option>
            {categories.map(category => <option key={category} value={category}>
              {category}
            </option>)
            }
          </select>
        </div>
        <ProfileList profiles={profileList}/>
      </div>
    );
  }
}

export default connect(
  state => ({ 
    user: getUser(state),
    profiles: getProfiles(state),
    userProfile: getUserProfile(state)  
  }),
  { loadProfiles, queryProfile, loadUserProfile }
)(Profiles);