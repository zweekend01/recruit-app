import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { userReducer } from './user';

// reducers
const reducers = combineReducers({
  userState: userReducer
});

// middlewares and enhancers
const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;
const enhancers = composeEnhancers(applyMiddleware(...middlewares));

// store
const store = createStore(reducers, enhancers);

export default store;
