import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadGroups } from './actions';
import { getGroups } from './reducers';
import GroupThumbnail from './GroupThumbnail';
import GroupForm from './GroupForm';
import { addGroup } from './actions';

class Groups extends Component {

  static propTypes = {
    loadGroups: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    groups: PropTypes.array
  };

  componentDidMount() {
    this.props.loadGroups();
  }

  render() {
    const { groups, addGroup } = this.props;
    if(!groups) return null;

    return (
      <div>
        <GroupForm label="Add" onComplete={addGroup}/>
        {groups.map(group => <Link key={group._id} to={`/groups/${group._id}`}> 
          <GroupThumbnail {...group}/>
        </Link>)}
      </div>
    );
  }
}

export default connect(
  state => ({ groups: getGroups(state) }),
  { loadGroups, addGroup }
)(Groups);