import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Router from './Router';
import { UserActionCreator } from './store/action-creators';

const mapStateToProps = ({ userState }) => ({
  hasInit: userState.hasInit,
});
const mapDispatchToProps = dispatch => ({
  initialize: () => {
    dispatch(UserActionCreator.initializeSync());
  }
});

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  static propTypes = {
    hasInit: PropTypes.bool.isRequired,
    initialize: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }

  render() {
    const { hasInit } = this.props;
    return hasInit ? <Router /> : null;
  }
}

export default hot(App);
