import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

const mapStateToProps = ({ userState }) => ({
  isAuth: userState.isAuth
});

@withRouter
@connect(mapStateToProps)
class AuthRouter extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
  };

  render() {
    const {
      isAuth,
      location: { pathname, search, hash },
      children
    } = this.props;
    const locationStr = encodeURIComponent(pathname + search + hash);

    return isAuth ? children : <Redirect to={`/?from=${locationStr}`} />;
  }
}

export default AuthRouter;
