import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WingBlank, WhiteSpace, List, InputItem, Button
} from 'antd-mobile';
import queryString from 'query-string';
import { to } from 'await-to-js';

import { Logo } from '../../components';
import { UserActionCreator } from '../../store/user';

const mapStateToProps = ({ userState }) => ({ userState });
const mapDispatchToProps = dispatch => ({
  login: param => dispatch(UserActionCreator.loginAsync(param))
});

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
  static propTypes = {
    userState: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
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
    const {
      userState: { company, position },
      login,
      history
    } = this.props;

    const [err] = await to(login(this.state));
    if (err) return;

    const { from } = queryString.parse(history.location.search);
    let toURL = '/dashboard/mine';

    if (!company && !position) toURL = from ? `/perfect-info?from=${from}` : '/perfect-info';
    if (from) toURL = decodeURIComponent(from);
    history.push(toURL);
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
