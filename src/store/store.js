import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'react-thunk';

const rootReducer = combineReducers({

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
    )
  )
);

export default store;
