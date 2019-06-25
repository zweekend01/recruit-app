import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Toast } from 'antd-mobile';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    console.log('error1:', error);
    // Toast.fail(error.message);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('error2:', error);
    console.log('info:', info);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) return <div>has Error</div>;

    return <div>{children}</div>;
  }
}
