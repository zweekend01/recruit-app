import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WingBlank,
  WhiteSpace,
  NavBar,
  Grid,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile';
import CSSModules from 'react-css-modules';
import { to } from 'await-to-js';
import queryString from 'query-string';

import { AVATAR_IMG } from '../../config/image';
import styles from './index.less';
import { UserActionCreator } from '../../store/user';

const gridData = AVATAR_IMG.map(item => ({ icon: item }));
const mapStateToProps = ({ userState }) => ({
  type: userState.type
});
const mapDispacthToProps = dispatch => ({
  perfectInfo: param => dispatch(UserActionCreator.perfectInfoAsync(param))
});

@connect(mapStateToProps, mapDispacthToProps)
@CSSModules(styles)
class PerfectInfo extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    perfectInfo: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    selectAvatar: '',
    company: '',
    position: '',
    salary: '',
    desc: ''
  };

  onSelectAvatar = (el, index) => {
    this.setState({ selectAvatar: gridData[index].icon });
  }

  onCollectInfo(field, value) {
    this.setState({ [field]: value });
  }

  onPerfectInfo = async () => {
    const { type, perfectInfo, history } = this.props;
    const [err] = await to(perfectInfo({ type, ...this.state }));
    if (err) return;

    const { from } = queryString.parse(history.location.search);
    const toURL = from ? decodeURIComponent(from) : '/dashboard/mine';
    history.push(toURL);
  }

  render() {
    const { type } = this.props;
    const {
      selectAvatar,
      company,
      position,
      salary,
      desc
    } = this.state;

    return (
      <div className="layout">
        {/* header */}
        <div className="header">
          <NavBar>完善个人信息</NavBar>
        </div>
        {/* content */}
        <div className="content">
          <WingBlank size="sm">
            <div styleName="select-avatar">
              <span>{selectAvatar ? '已选择头像' : '请选择头像'}</span>
              {selectAvatar && <img src={selectAvatar} alt="select-avatar" />}
            </div>
            <Grid data={gridData} columnNum={5} onClick={this.onSelectAvatar} />
            <WhiteSpace />
            {type === 'boss' && <InputItem value={company} onChange={this.onCollectInfo.bind(this, 'company')}>公司</InputItem>}
            <InputItem value={position} onChange={this.onCollectInfo.bind(this, 'position')}>{type === 'boss' ? '招聘' : '应聘'}岗位</InputItem>
            <InputItem value={salary} onChange={this.onCollectInfo.bind(this, 'salary')}>{type === 'boss' ? '提供' : '期望'}薪资</InputItem>
            <TextareaItem title="简介" value={desc} autoHeight onChange={this.onCollectInfo.bind(this, 'desc')} />
            <WhiteSpace size="xl" />
            <Button type="primary" size="small" onClick={this.onPerfectInfo}>保存</Button>
            <WhiteSpace size="xl" />
          </WingBlank>
        </div>

      </div>
    );
  }
}

export default PerfectInfo;
