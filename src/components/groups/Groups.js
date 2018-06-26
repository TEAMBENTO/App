import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadGroups } from './actions';
import { getGroups } from './reducers';
import GroupThumbnail from './GroupThumbnail';
import GroupForm from './GroupForm';
import { addGroup } from './actions';

class Groups extends Component {

  state = {
    redirect: false,
    newGroup: ''
  };

  static propTypes = {
    loadGroups: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
    groups: PropTypes.array
  };

  componentDidMount() {
    this.props.loadGroups();
  }

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
    if(!groups) return null;

    if(redirect && newGroup) return <Redirect to={`/groups/${newGroup._id}`}/>;

    return (
      <div>
        <GroupForm label="Add" onComplete={this.handleAdd}/>
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