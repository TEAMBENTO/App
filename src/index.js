import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import { Provider } from 'react-redux';
import App from './components/app/App';
import store from './store/store';
// import 'normalize-css';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);