import React from 'react';
import {
  Switch, Route, Redirect
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

const publicRedirects = [];
const publicRoutes = [
  { exact: true, path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
];
const protectedRedirects = [
  { from: '/dashboard', to: '/dashboard/mine' }
];
const protectedRoutes = [
  { path: '/perfect-info', component: PerfectInfo },
  { path: '/dashboard/:tab', component: Dashboard }
];

export default () => (
  <Switch>
    {/* Redirects */}
    {publicRedirects.map(item => <Redirect key={item.from} {...item} />)}
    {/* Routes */}
    {publicRoutes.map(item => <Route key={item.path} {...item} />)}
    {/* AuthRoute */}
    <AuthRoute />
    {/* PrivateRedirects */}
    {protectedRedirects.map(item => <Redirect key={item.from} {...item} />)}
    {/* PrivateRoutes */}
    {protectedRoutes.map(item => <Route key={item.path} {...item} />)}
    {/* NotFound */}
    <Route component={NotFound} />
  </Switch>
);
