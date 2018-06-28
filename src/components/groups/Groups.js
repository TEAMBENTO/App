import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroups } from './reducers';
import { loadGroups } from './actions';
import { addGroup } from './actions';
import GroupForm from './GroupForm';
import GroupList from './GroupList';
import EventList from '../events/EventsList';
import { getUserProfile } from '../profile/reducers';
import { loadUserProfile, queryProfile } from '../profile/actions';
import { getUser } from '../auth/reducers';

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
    this.props.queryProfile(this.props.user._id)
      .then(({ payload }) => {
        return this.props.loadUserProfile(payload[0]._id);
      });
    this.props.loadGroups();
  }

  state = {
    redirect: false,
    newGroup: ''
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

  render() {
    const { groups } = this.props;
    const { redirect, newGroup } = this.state;

    if(redirect && newGroup) return <Redirect to={`/groups/${newGroup._id}`}/>;

    return (
      <div>
        <GroupForm label="Add" onComplete={this.handleAdd}/>
        <GroupList groups={groups}/>
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