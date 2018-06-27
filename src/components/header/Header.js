import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { logout, profLogout } from '../auth/actions';
import styles from './Header.css';
// import logo from '../../../assets/RallyLogo_noback.png';
// import { HomeIcon, ImageFilterIcon, ImageOutlineIcon, HelpIcon } from 'mdi-react';

class Header extends Component {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    profLogout: PropTypes.func.isRequired
  };

  handleLogout = () => {
    this.props.logout();
    this.props.profLogout();
  };

  render() {

    const { user } = this.props;

    return (
      <nav className={styles.nav}>
        <ul>
          <li><NavLink to="/about" >About</NavLink></li>
          <li><NavLink to="/profile/:id" >Profile</NavLink></li>
          <li><NavLink to="/profiles" >Profiles</NavLink></li>
          <li><NavLink exact to="/"><img src='http://res.cloudinary.com/dmy3efbjm/image/upload/v1530131312/Rally_Logo_noback.png' id="logo"></img></NavLink></li>
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
  state => ({ user: getUser(state) }),
  { logout, profLogout }
)(Header);