import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
import Home from '../home/Home';
import About from '../about/About';
import Nav from '../nav/Nav';
import Profile from '../profile/Profile';
// import { connect } from 'react-redux';
import styles from './App.css';
// import Error from './Error';
// import Loading from './Loading';


class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className={styles.app}>
          <h1>Hello World!</h1>
          <Nav/>
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route exact path="/profile" component={Profile}/>
              {/* <Route exact path="/events" component={Events}/>
              <Route exact path="/groups" component={Groups}/> */}
              <Redirect to="/"/>
            </Switch>
          </main>
          {/* <Error/>
          <Loading/> */}
          <footer>I am footer</footer>
        </div>
      </Router>
    );
  }
}

export default App;