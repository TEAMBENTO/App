import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin, signup } from './actions';
// import { addProfile } from '../profile/actions';
import { getUser } from './reducers';
import { getProfile } from '../profile/reducers';
import Credentials from './Credentials';
import styles from './Auth.css';

class Auth extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
    signin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    // addProfile: PropTypes.func.isRequired,
    location: PropTypes.object,
    profile: PropTypes.object
  };

  render() {
    const { user, signin, signup, location, profile } = this.props;
    const redirect = location.state ? location.state.from : `/profile/${profile._id}`; //we need profile.id to redirect to profile.

    if(user && profile) return <Redirect to={redirect}/>;
    
    return (
      <section className={styles.auth}>
        <Switch>
          <Route path="/auth/signin" component={() => (
            <div>
              <p>Not yet registered? <Link to="/auth/signup">Sign Up</Link></p>
              <Credentials action="Sign In" submit={signin}/>
            </div>
          )}/>
          <Route path="/auth/signup" render={() => (
            <div>
              <p>Already have an account? <Link to="/auth/signin">Sign In</Link></p>
              <Credentials action="Sign Up" submit={signup} allowName={true}/>
            </div>
          )}/>
          <Redirect to="/auth/signin"/>
        </Switch>
      </section>
    );
  }
}

export default connect(
  state => ({ 
    user: getUser(state),
    profile: getProfile(state) 
  }),
  { signup, signin }
)(Auth);

