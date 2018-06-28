import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GroupThumbnail extends Component {

  static propTypes = {
    image: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired
  };

  render() {
    const { teamName, image } = this.props;

    return (
      <div id = "image-thumbnail">
        {image && <img src={image}/>}
        {teamName && <h1>{teamName}</h1>}
      </div>
    );
  }
}

export default GroupThumbnail;