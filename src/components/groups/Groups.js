import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroups } from './reducers';
import { addGroup } from './actions';
import GroupForm from './GroupForm';
import GroupList from './GroupList';

class Groups extends Component {

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
    const { redirect, newGroup } = this.state;

    if(redirect && newGroup) return <Redirect to={`/groups/${newGroup._id}`}/>;

    return (
      <div>
        <GroupForm label="Add" onComplete={this.handleAdd}/>
        <GroupList/>
      </div>
    );
  }
}

export default connect(
  state => ({ groups: getGroups(state) }),
  { addGroup }
)(Groups);