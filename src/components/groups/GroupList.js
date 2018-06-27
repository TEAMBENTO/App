import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GroupThumbnail from './GroupThumbnail';
import { loadGroups } from './actions';
import { getGroups } from './reducers';

class GroupList extends Component {
  static propTypes = {
    loadGroups: PropTypes.func.isRequired,
    groups: PropTypes.array
  };

  componentDidMount() {
    this.props.loadGroups();
  }

  render() {
    const { groups } = this.props;
    if(!groups) return null;

    return (
      <div>
        {groups.map(group => <Link key={group._id} to={`/groups/${group._id}`}> 
          <GroupThumbnail {...group}/>
        </Link>)}      
      </div>
    );
  }
}

export default connect(
  state => ({ groups: getGroups(state) }),
  { loadGroups }
)(GroupList);