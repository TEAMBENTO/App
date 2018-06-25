import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadGroups } from './actions';
import { getGroups } from './reducers';
import GroupThumbnail from './GroupThumbnail';

class Groups extends Component {

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
        {groups.map(group => <h1 key={group._id}>{group.name}</h1>)}
      </div>
    );
  }
}

export default connect(
  state => ({ groups: getGroups(state) }),
  { loadGroups }
)(Groups);