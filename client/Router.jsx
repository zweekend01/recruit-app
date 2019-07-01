import React from 'react';
import {
  BrowserRouter, Switch, Route
} from 'react-router-dom';

import { AuthRouter } from './components';
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


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <AuthRouter>
        <Route path="/test" component={Test} />
      </AuthRouter>
    </Switch>
  </BrowserRouter>
);

export default Router;
