import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroup } from './reducers';
import { loadGroup, updateGroup } from './actions';
import GroupForm from './GroupForm';

class GroupDetail extends Component {

  state = {
    editing: false
  };

  static propTypes = {
    match: PropTypes.object,
    loadGroup: PropTypes.func,
    group: PropTypes.object,
    updateGroup: PropTypes.func
  };

  componentDidMount() {
    this.props.loadGroup(this.props.match.params.id);
  }

  handleEdit = () => {
    console.log('I MADE IT!');
    this.setState({ editing: true });
  };

  handleCancel = () => {
    this.setState({ editing: false });
  };

  handleUpdate = data => {
    this.props.updateGroup(data)
      .then(res => {
        console.log('RES!!!', res);
      });
    this.setState({ editing: false });
  };
  

  render() {
    const { editing } = this.state;
    const { group } = this.props;
    const { teamName, image, description } = group;
    if(!group) return null;


    return (
      <div>
        <h1> I am here!</h1>
        <h1>{teamName}</h1>
        <img src={image}/>
        <p>{description}</p>
        {editing || <button onClick={this.handleEdit}>✐</button>}
        {editing && 
          <div>
            <GroupForm
              label="Update"
              group={group}
              onComplete={this.handleUpdate}
              onCancel={this.handleCancel}
            />
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({ 
    group: getGroup(state)
  }),
  { loadGroup, updateGroup }
)(GroupDetail);