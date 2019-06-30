import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WingBlank, WhiteSpace, List, InputItem, Button
} from 'antd-mobile';

import { Logo } from '../../components';
import { UserActionCreator } from '../../action-creators';

const mapDispatchToProps = dispatch => ({
  login: (param) => {
    dispatch(UserActionCreator.asyncLogin(param));
  }
});

@connect(null, mapDispatchToProps)
class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  state = {
    name: '',
    password: ''
  };

  onChange(field, val) {
    this.setState({ [field]: val });
  }

  onLogin = () => {
    const { login } = this.props;
    login(this.state);
  }

  render() {
    const { name, password } = this.state;

    return (
      <div className="layout">
        {/* content */}
        <WingBlank>
          {/* logo */}
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Logo />
          {/* input */}
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <List>
            <InputItem value={name} maxLength={16} onChange={this.onChange.bind(this, 'name')}>用户名</InputItem>
            <InputItem value={password} maxLength={6} onChange={this.onChange.bind(this, 'password')}>密码</InputItem>
          </List>
          {/* button */}
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Button type="primary" onClick={this.onLogin}>登录</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
