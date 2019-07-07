import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, Button } from 'antd-mobile';
import CSSModules from 'react-css-modules';
import queryString from 'query-string';

import { Logo } from '../../components';
import { REGISTER_ROUTER, LOGIN_ROUTER } from '../../config/router';
import styles from './index.less';

class Home extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  onLogin = () => {
    const { history } = this.props;
    const { from } = queryString.parse(history.location.search);
    const toURL = from ? `${LOGIN_ROUTER}?from=${from}` : LOGIN_ROUTER;
    history.push(toURL);
  }

  onRegister = () => {
    const { history } = this.props;
    const { from } = queryString.parse(history);
    const toURL = from ? `${REGISTER_ROUTER}?from=${from}` : REGISTER_ROUTER;
    history.push(toURL);
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
