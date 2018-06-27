import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

class EventDetail extends Component {
  render() {
    return (
      <div>
        <h2>Event detail view</h2>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(EventDetail);