import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tryLoadUser } from '../auth/actions';
import { getCheckedAuth, getUser } from '../auth/reducers';
import PrivateRoute from './PrivateRoute';
import Auth from '../auth/Auth';
import About from '../about/About';
import Header from '../header/Header';
import Profile from '../profile/Profile';
import Groups from '../groups/Groups';
import Events from '../events/Events';
import Profiles from '../profile/Profiles';
import styles from './App.css';
import GroupDetail from '../groups/GroupDetail';


class App extends PureComponent {

  static propTypes = {
    tryLoadUser: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  componentDidMount() {
    this.props.tryLoadUser();
  }

  render() {

    const { checkedAuth } = this.props;

    return (
      <Router>
        <div className={styles.app}>
          <Header/>
          <main>
            { checkedAuth && 
            <Switch>
              <Route path="/about" component={About}/>
              <PrivateRoute path="/profiles" component={Profiles}/>          
              <PrivateRoute exact path="/profile/:id" component={Profile} />      
              <Route path="/auth" component={Auth}/>
              <Route path="/events" component={Events}/>
              <Route exact path="/groups" component={Groups}/>
              <PrivateRoute exact path="/groups/:id" component={GroupDetail}/>
              <Redirect to="/events/map"/>
            </Switch>
            }
          </main>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({ 
    checkedAuth: getCheckedAuth(state), 
    user: getUser(state) 
  }),
  { tryLoadUser }
)(App);