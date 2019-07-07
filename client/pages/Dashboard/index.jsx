import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {
  NavBar,
  TabBar
} from 'antd-mobile';
import CSSModules from 'react-css-modules';

import * as image from '../../config/image';
import UserList from './UserList';
import MessageList from './MessageList';
import Mine from './Mine';
import styles from './index.less';

const navBarTitleMap = {
  userboss: 'BOSS列表',
  usergenius: '牛人列表',
  message: '消息列表',
  mine: '个人中心'
};
const mapStateToProps = ({ userState }) => ({
  type: userState.type
});

@connect(mapStateToProps)
@CSSModules(styles)
class Dashboard extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  get navBarTitle() {
    const { type, match: { params: { tab } } } = this.props;
    return tab === 'user' ? navBarTitleMap[`user${type}`] : navBarTitleMap[tab];
  }

  get tabList() {
    const { type, match: { params: { tab } } } = this.props;
    return [
      {
        key: 'user',
        icon: type === 'boss' ? image.BOSS_IMG : image.GENIUS_IMG,
        selectedIcon: type === 'boss' ? image.BOSS_ACTIVE_IMG : image.GENIUS_ACTIVE_IMG,
        title: type === 'boss' ? 'boss' : '牛人',
        selected: tab === 'user',
        dot: false,
      },
      {
        key: 'message',
        icon: image.MSG_IMG,
        selectedIcon: image.MSG_ACTIVE_IMG,
        title: '消息',
        selected: tab === 'message',
        dot: true
      },
      {
        key: 'mine',
        icon: image.MINE_IMG,
        selectedIcon: image.MINE_ACTIVE_IMG,
        title: '我的',
        selected: tab === 'mine',
        dot: false
      },
    ];
  }

  onSelectTab(tab) {
    const { history } = this.props;
    history.push(`/dashboard/${tab}`);
  }

  render() {
    return (
      <div className="layout" styleName="container">
        {/* header */}
        <div styleName="header">
          <NavBar>{this.navBarTitle}</NavBar>
        </div>
        {/* content */}
        <div styleName="content">
          <Switch>
            <Route path="/dashboard/user" component={UserList} />
            <Route path="/dashboard/message" component={MessageList} />
            <Route path="/dashboard/mine" component={Mine} />
          </Switch>
        </div>
        {/* footer */}
        <div styleName="footer">
          <TabBar>
            {this.tabList.map(item => (
              <TabBar.Item
                key={item.key}
                icon={(
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${item.icon}) center center /  21px 21px no-repeat`
                  }}
                  />
                )}
                selectedIcon={(
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${item.selectedIcon}) center center /  21px 21px no-repeat`
                  }}
                  />
                )}
                title={item.title}
                selected={item.selected}
                dot={item.dot}
                onPress={this.onSelectTab.bind(this, item.key)}
              />
            ))}
          </TabBar>
        </div>
      </div>
    );
  }
}

export default Dashboard;
