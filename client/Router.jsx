import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';

import { AuthRouter } from './components';
import {
  Home,
  Register,
  Login,
  PerfectInfo,
  Dashboard,
  NotFound
} from './pages';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <AuthRouter>
        <Switch>
          <Route path="/perfect-info" component={PerfectInfo} />
          <Route exact path="/dashboard" render={() => <Redirect to="/dashboard/mine" />} />
          <Route path="/dashboard/:tab" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </AuthRouter>
    </Switch>
  </BrowserRouter>
);

export default Router;
