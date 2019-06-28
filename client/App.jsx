import { hot } from 'react-hot-loader/root';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Router from './Router';

const App = () => (
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);

export default hot(App);
