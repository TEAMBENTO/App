import React, { Component } from 'react';
import { connect } from 'react-redux';



class AddEvent extends Component {
  render() {
    return (
      <div>
        Add Event details form
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(AddEvent);