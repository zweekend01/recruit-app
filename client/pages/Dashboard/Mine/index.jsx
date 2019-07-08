import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WingBlank, WhiteSpace, Result, List, Button, Modal
} from 'antd-mobile';
import CSSModules from 'react-css-modules';

import { userActionCreator } from '../../../store/user';
import { DEFAULT_AVATAR_IMG } from '../../../config/image';
import styles from './index.less';

const mapStateToProps = ({ userState }) => ({ userState });
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userActionCreator.logoutSync())
});
const { Item } = List;
const { Brief } = Item;

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Mine extends Component {
  static propTypes = {
    userState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  onShowAlert = () => {
    Modal.alert('退出登录', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
      { text: 'OK', onPress: this.onLogout },
    ]);
  }

  onLogout = () => {
    const { logout } = this.props;
    logout();
  }

  render() {
    const {
      userState: {
        type, name, avatar, company, position, salary, desc
      }
    } = this.props;

    return (
      <div className="layout">
        {/* content */}
        <div styleName="content">
          <Result
            img={<img styleName="avatar" src={avatar || DEFAULT_AVATAR_IMG} alt="avatar" />}
            title={name}
            message={company || ''}
          />
          <List renderHeader={() => '详情'}>
            <Item extra={position}>{type === 'boss' ? '招聘' : '应聘'}岗位</Item>
            {salary && <Item extra={salary}>{type === 'boss' ? '提供' : '期待'}薪资</Item>}
            {desc && (
              <Item multipleLine wrap>简介<Brief>{desc}</Brief></Item>
            )}
          </List>
          <WhiteSpace size="xl" />
          <WingBlank size="sm">
            <Button type="warning" size="small" onClick={this.onShowAlert}>退出登录</Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default Mine;
