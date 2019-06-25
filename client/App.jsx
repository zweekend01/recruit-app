import { hot } from 'react-hot-loader/root';
import React, { Component, StrictMode } from 'react';
import { Toast } from 'antd-mobile';

class App extends Component {
  state = {
    name: 'App'
  };

  async componentDidMount() {
    console.log('mount');
    try {
      this.fetchData();
    } catch (error) {
      Toast.fail(error.message);
    }
  }

  fetchData = async () => {
    throw new Error('获取数据失败');
  }

  render() {
    const { name } = this.state;

    return (
      <StrictMode>
        <div>This is {name}!</div>
      </StrictMode>
    );
  }
}

export default hot(App);
