import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Error from './Error';
import Loading from './Loading';


class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Error/>
        <Loading/>
      </div>
    );
  }
}

export default App;