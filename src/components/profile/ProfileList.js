import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ProfileList.css';



class ProfileList extends Component {

    static propTypes = {
      profiles: PropTypes.array,
    };

    render() {
      const { profiles } = this.props;
      if(!profiles) return null;

      return (
        <ul className={styles.profileList}>
          {profiles.map(profile => <Link key={profile._id} to={`/profile/${profile._id}`}>
            {profile.image && <p><img src={profile.image}></img></p>}
          </Link>)}
        </ul>
      ); 
    } 
}

export default ProfileList;
