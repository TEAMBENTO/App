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
            <p>{profile.image ? <img key={profile._id} src={profile.image}/> : <img src="https://harrell-remodeling.com/wp-content/uploads/2017/09/Person-placeholder.jpg"/>}</p>
          </Link>)}
        </ul>
      ); 
    } 
}

export default ProfileList;
