import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, Button } from 'antd-mobile';
import CSSModules from 'react-css-modules';

import { Logo } from '../../components';
import { REGISTER_ROUTER, LOGIN_ROUTER } from '../../config/router';
import styles from './index.less';

class Home extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  onLogin = () => {
    const { history, location: { search } } = this.props;
    history.push(LOGIN_ROUTER + search);
  }

  onRegister = () => {
    const { history, location: { search } } = this.props;
    history.push(REGISTER_ROUTER + search);
  }

  render() {
    return (
      <div className="layout">
        <WingBlank>
          {/* content */}
          <div styleName="content">
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <Logo />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <Button type="primary" onClick={this.onLogin}>登录</Button>
            <WhiteSpace />
            <Button type="primary" onClick={this.onRegister} style={{ flexShrink: 0 }}>注册</Button>
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default CSSModules(Home, styles);
