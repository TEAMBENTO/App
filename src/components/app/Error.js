import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getError } from './reducers';
import { clearError } from './actions';
import PropTypes from 'prop-types';


class Error extends Component {

  static propTypes = {
    error: PropTypes.array,
    clearError: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    if(!this.props.error) return;
    setTimeout(this.props.clearError, 5000);
  }
  

  render() {
    const { error } = this.props;
    if(!error) return null;

    const message = error.message || error;

    return (
      <pre>{message}</pre>
    );
  }
}

export default connect(
  state => ({
    error: getError(state)
  }),
  { clearError }
)(Error);