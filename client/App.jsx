import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Router from './Router';
import { UserActionCreator } from './store/action-creators';

const mapStateToProps = ({ userState }) => ({
  hasInit: userState.hasInit,
  isLogin: userState.isLogin
});
const mapDispatchToProps = dispatch => ({
  initUserState: () => {
    dispatch(UserActionCreator.initUserState());
  }
});

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  static propTypes = {
    hasInit: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool.isRequired,
    initUserState: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { initUserState } = this.props;
    initUserState();
  }

  render() {
    const { hasInit, isLogin } = this.props;
    return hasInit ? <Router isLogin={isLogin} /> : null;
  }
}

export default hot(App);
