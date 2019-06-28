import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Home } from './pages';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
