import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroup } from './reducers';
import { loadGroup } from './actions';

class GroupDetail extends Component {

  static propTypes = {
    group: PropTypes.object,
    match: PropTypes.object,
    loadGroup: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.loadGroup(this.props.match.params.id);
  }
  

  render() {
    const { teamName, image, description } = this.props.group;

    return (
      <div>
        <h1>{teamName}</h1>
        <img src={image}/>
        <p>{description}</p>
      </div>
    );
  }
}

export default connect(
  state => ({ 
    group: getGroup(state)
  }),
  { loadGroup }
)(GroupDetail);