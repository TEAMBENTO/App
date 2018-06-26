import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGroup } from './actions';
import { getGroups } from './reducers';

class GroupForm extends Component {

  static PropTypes = {
    addGroup: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        hello group form.
      </div>
    );
  }
}

export default connect(
  state => ({ group: getGroups(state) }),
  { addGroup }
)(GroupForm);