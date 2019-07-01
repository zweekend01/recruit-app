import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';
import { Home, Register, Login } from './pages';

import Http from './store/services/http';

function onClick() {
  Http.request({
    url: '/v1/loop'
  });
}
function Test() {
  return <div onClick={onClick}>This is Test</div>;
}


const Router = ({ isLogin }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      {!isLogin && <Redirect to="/" />}
      <Route path="/test" component={Test} />
    </Switch>
  </BrowserRouter>
);

Router.propTypes = {
  isLogin: PropTypes.bool.isRequired
};

export default Router;
