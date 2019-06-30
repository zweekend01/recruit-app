import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, Button } from 'antd-mobile';
import CSSModules from 'react-css-modules';

import { Logo } from '../../components';
import { REGISTER_ROUTER, LOGIN_ROUTER } from '../../config/router';
import styles from './index.less';

class Home extends Component {
  onLogin = () => {
    const { history } = this.props; // eslint-disable-line
    history.push(LOGIN_ROUTER);
  }

  onRegister = () => {
    const { history } = this.props; // eslint-disable-line
    history.push(REGISTER_ROUTER);
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
