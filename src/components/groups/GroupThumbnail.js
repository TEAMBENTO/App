import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GroupThumbnail extends Component {

  static propTypes = {
    group: PropTypes.object.isRequired
  };

  render() {
    const { teamName, image } = this.props.group;

    return (
      <div>
        {image && <img src={image}/>}
        {teamName && <h1>{teamName}</h1>}
      </div>
    );
  }
}

export default GroupThumbnail;