import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tryLoadUser } from '../auth/actions';
import { getCheckedAuth, getUser } from '../auth/reducers';
// import PrivateRoute from './PrivateRoute';
import Home from '../home/Home';
import Auth from '../auth/Auth';
import About from '../about/About';
import Nav from '../nav/Nav';
import Profile from '../profile/Profile';
import Groups from '../groups/Groups';
import Events from '../events/Events';
import Profiles from '../profile/Profiles';
import styles from './App.css';
import GroupDetail from '../groups/GroupDetail';

// import Error from './Error';
// import Loading from './Loading';


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

    const { checkedAuth, user } = this.props;

    console.log('HERE', checkedAuth);


    return (
      <Router>
        <div className={styles.app}>
          <h1>Hello World!</h1>
          { 
            user 
              ? <div>
                <h1>Rally</h1>
                <h2 className="user-name">Hello {user.name}</h2>
              </div>
              : <h1>Rally</h1>
          }
          <Nav/>
          <main>
            { checkedAuth && 
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route exact path="/profile/:id" component={Profile}/>          
              <Route path="/profiles" component={Profiles}/>          
              <Route path="/auth" component={Auth}/>
              <Route path="/events" component={Events}/>
              <Route exact path="/groups" component={Groups}/>
              <Route exact path="/groups/:id" component={GroupDetail}/>
              <Redirect to="/"/>
            </Switch>
            }
          </main>
          {/* <Error/>
          <Loading/> */}
          <footer>I am footer</footer>
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