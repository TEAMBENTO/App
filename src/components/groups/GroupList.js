import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GroupThumbnail from './GroupThumbnail';
import styles from './GroupList.css'; 

class GroupList extends Component {
  static propTypes = {
    groups: PropTypes.array
  };

  render() {
    const { groups } = this.props;
    if(!groups) return null;

    return (
      <div className={styles.grouplist}>
        {groups.map(group => <Link key={group._id} to={`/groups/${group._id}`}> 
          <GroupThumbnail {...group}/>
        </Link>)}      
      </div>
    );
  }
}

export default GroupList;