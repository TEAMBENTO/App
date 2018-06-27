import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { logout, profLogout, userProfLogout } from '../auth/actions';
import styles from './Nav.css';
// import { HomeIcon, ImageFilterIcon, ImageOutlineIcon, HelpIcon } from 'mdi-react';

class Nav extends Component {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    profLogout: PropTypes.func.isRequired,
    userProfLogout: PropTypes.func.isRequired
  };

  handleLogout = () => {
    this.props.logout();
    this.props.profLogout();
    this.props.userProfLogout();
  };

  render() {

    const { user } = this.props;

    return (
      <nav className={styles.nav}>
        <ul>
          <li><NavLink exact to="/" >Home</NavLink></li>
          <li><NavLink to="/about" >About</NavLink></li>
          <li><NavLink to="/profile/:id" >Profile</NavLink></li>
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
  state => ({ user: getUser(state) }),
  { logout, profLogout, userProfLogout }
)(Nav);
