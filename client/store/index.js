import {
  createStore,
  combineReducers,
  applyMiddleware,
  // compose
} from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from './user';

// reducers
const reducers = combineReducers({
  userState: userReducer
});

// middlewares and enhancers
// const composeEnhancers = typeof window === 'object' &&
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//   : compose;
// const enhancers = compose(
//   applyMiddleware(thunk),
//   (window && window.devToolsExtension) ? window.devToolsExtension() : f => f,
// );
const enhancers = applyMiddleware(thunk);

const store = createStore(reducers, enhancers);

export default store;
