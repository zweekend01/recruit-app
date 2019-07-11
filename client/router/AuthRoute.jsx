import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

const mapStateToProps = ({ userState }) => ({
  isAuth: userState.isAuth,
  company: userState.company,
  position: userState.position
});

@withRouter
@connect(mapStateToProps)
class AuthRoute extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired
  };

  get needRedirect() {
    const { isAuth, company, position } = this.props;
    return !isAuth || (!company && !position);
  }

  render() {
    const {
      location: { pathname, search, hash },
      isAuth,
      company,
      position
    } = this.props;
    const to = {
      pathname: !isAuth ? '/' : !company && !position && '/perfect-info',
      state: { from: pathname + search + hash }
    };

    return (!isAuth || (!company && !position)) && <Redirect to={to} />;
  }
}

export default AuthRoute;
