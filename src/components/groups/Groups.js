import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroups } from './reducers';
import { loadGroups } from './actions';
import { addGroup } from './actions';
import GroupForm from './GroupForm';
import GroupList from './GroupList';
import { getUserProfile } from '../profile/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import { getUser } from '../auth/reducers';
import styles from './Groups.css';

class Groups extends Component {
  static propTypes = {
    loadGroups: PropTypes.func.isRequired,
    loadUserProfile: PropTypes.func.isRequired,
    queryProfile: PropTypes.func.isRequired,
    groups: PropTypes.array,
    user: PropTypes.object,
    userProfile: PropTypes.object
  };

  componentDidMount() {
    if(this.props.user !== null) {
      this.props.queryProfile(this.props.user._id)
        .then(({ payload }) => {
          return this.props.loadUserProfile(payload[0]._id);
        });
    }
    this.props.loadGroups();
  }

  state = {
    redirect: false,
    newGroup: '',
    filter: 'allActivities'
  };

  static propTypes = {
    addGroup: PropTypes.func.isRequired,
  };

  handleAdd = group => {
    this.props.addGroup(group)
      .then(({ payload }) => {
        this.setState({
          redirect: true,
          newGroup: payload
        });
      });
  };

  handleSelect = ({ target }) => {
    this.setState(() => {
      return {
        ...this.state,
        filter: target.value
      };
    });
  };

  filterCategories = filter => {
    const { groups } = this.props;
    const filteredList = groups.filter(group => group.type === filter);
    return filteredList;
  };

  render() {
    const categories = ['basketball', 'yoga', 'baseball', 'tennis', 'hiking', 'running', 'racquetball', 'frisbee', 'climbing', 'rafting', 'kayaking', 'swimming', 'golfing', 'football', 'ice hockey', 'volleyball', 'cross fit', 'softball', 'badminton', 'walking', 'chess', 'soccer'];
    const { groups, user } = this.props;
    const { redirect, newGroup, filter } = this.state;

    const groupList = filter === 'allActivities' ? groups : this.filterCategories(filter);

    if(redirect && newGroup) return <Redirect to={`/groups/${newGroup._id}`}/>;

    return (
      <div className = {styles.groups}>
        <div>
          <h3>Filter Groups by Activity</h3>
          <select onChange={this.handleSelect}>
            <option id ="activity" value="allActivities"> All Activity</option>
            {categories.map(category => <option key={category} value={category}>
              {category}
            </option>)
            }
          </select>
        </div>
        {user && <GroupForm label="Add" onComplete={this.handleAdd}/>}
        <GroupList groups={groupList}/>
      </div>
    );
  }
}

export default connect(
  state => ({ 
    user: getUser(state),
    groups: getGroups(state),
    userProfile: getUserProfile(state)
  }),
  { addGroup, loadGroups, queryProfile, loadUserProfile }
)(Groups);