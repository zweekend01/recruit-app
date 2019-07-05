import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WingBlank, WhiteSpace, List, InputItem, Button
} from 'antd-mobile';
import queryString from 'query-string';

import { Logo } from '../../components';
import { UserActionCreator } from '../../store/user';

const mapDispatchToProps = dispatch => ({
  login: (param) => {
    dispatch(UserActionCreator.loginAsync(param));
  }
});

@connect(null, mapDispatchToProps)
class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    name: '',
    password: ''
  };

  onChange(field, val) {
    this.setState({ [field]: val });
  }

  onLogin = async () => {
    const { login, location: { search }, history } = this.props;
    await login(this.state);

    const { from } = queryString.parse(search);
    if (from) {
      history.push(from);
    }
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
