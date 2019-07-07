import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';
// import CSSModules from 'react-css-modules';

import * as image from '../../../config/image';
// import styles from './index.less';

const thumbStyle = { width: '45px', height: '45px', borderRadius: '50%' };
const mapStateToProps = ({ userState }) => ({ userState });

@connect(mapStateToProps)
class UserList extends Component {
  static propTypes = {
    userState: PropTypes.object.isRequired
  };

  render() {
    const { userState: { userList } } = this.props;

    return (
      <div className="layout">
        {/* content */}
        <div>
          <WingBlank size="sm">
            {userList.map((item, index) => (
              <div key={item.id}>
                <WhiteSpace size="md" />
                <Card>
                  <Card.Header
                    title={item.name}
                    thumb={item.avatar || image.DEFAULT_AVATAR_IMG}
                    thumbStyle={thumbStyle}
                    extra={<span>{item.position}</span>}
                  />
                  <Card.Body>
                    <div>{item.desc}</div>
                  </Card.Body>
                  {(item.company || item.salary) && (
                    <Card.Footer
                      content={(
                        <div>
                          <div>{item.type === 'boss' ? `公司：${item.company}` : ''}</div>
                          <div>{`${item.type === 'boss' ? '提供' : '期望'}薪资：${item.salary}`}</div>
                        </div>
                      )}
                    />
                  )}
                </Card>
                {index === userList.length - 1 && <WhiteSpace size="xl" />}
              </div>
            ))}
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default UserList;
