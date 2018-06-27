import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvent } from './reducers';
import { loadEvent } from './actions';


class EventDetail extends Component {

  static propTypes = {
    match: PropTypes.object,
    loadEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired
  };
  
  componentDidMount() {
    console.log(this.props.match);
    this.props.loadEvent(this.props.match.params.id);
  }


  render() {
    return (
      <div>
        <h2>Event detail view</h2>
      </div>
    );
  }
}

export default connect(
  state => ({
    event: getEvent(state)
  }),
  { loadEvent }
)(EventDetail);