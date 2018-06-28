import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { logout, profLogout, userProfLogout } from '../auth/actions';
import styles from './Header.css';
import { getUserProfile } from '../profile/reducers';
// import logo from '../../../assets/RallyLogo_noback.png';
// import { HomeIcon, ImageFilterIcon, ImageOutlineIcon, HelpIcon } from 'mdi-react';

class Header extends Component {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    profLogout: PropTypes.func.isRequired,
    userProfLogout: PropTypes.func.isRequired,
    userProfile: PropTypes.object
  };

  handleLogout = () => {
    this.props.logout();
    this.props.profLogout();
    this.props.userProfLogout();
  };

  render() {

    const { user, userProfile } = this.props;

    return (
      <nav className={styles.nav}>
        <h1><NavLink exact to="/"><img src='http://res.cloudinary.com/dmy3efbjm/image/upload/v1530131312/Rally_Logo_noback.png' id="logo"></img></NavLink></h1>
        <ul>
          <li><NavLink to="/about" >About</NavLink></li>
          { userProfile &&
            <li><NavLink to={`/profile/${userProfile._id}`} >Profile</NavLink></li>
          }
          <li><NavLink to="/profiles" >Profiles</NavLink></li>
          <li><NavLink to="/events" >Events</NavLink></li>
          <li><NavLink to="/groups" >Groups</NavLink></li>
          {
            user
              ? <li><NavLink to="/" onClick={this.handleLogout}>Logout</NavLink></li>
              : <li><NavLink to="/auth">Login</NavLink></li>
          }
        </ul>
      </nav>
    );
  }

}

export default connect(
  state => ({ 
    user: getUser(state),
    userProfile: getUserProfile(state) 
  }),
  { logout, profLogout, userProfLogout }
)(Header);