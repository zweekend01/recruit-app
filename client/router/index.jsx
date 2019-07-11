import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';

import AuthRoute from './AuthRoute';
import {
  Home,
  Register,
  Login,
  PerfectInfo,
  Dashboard,
  NotFound
} from '../pages';

const redirects = [];
const routes = [
  { exact: true, path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
];
const privateRedirects = [
  { from: '/dashboard', to: '/dashboard/mine' }
];
const privateRoutes = [
  { path: '/perfect-info', component: PerfectInfo },
  { path: '/dashboard/:tab', component: Dashboard }
];

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* Redirects */}
      {redirects.map(item => <Redirect key={item.from} {...item} />)}
      {/* Routes */}
      {routes.map(item => <Route key={item.path} {...item} />)}
      {/* AuthRoute */}
      <AuthRoute />
      {/* PrivateRedirects */}
      {privateRedirects.map(item => <Redirect key={item.from} {...item} />)}
      {/* PrivateRoutes */}
      {privateRoutes.map(item => <Route key={item.path} {...item} />)}
      {/* NotFound */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
