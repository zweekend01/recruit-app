import { hot } from 'react-hot-loader/root';
import React, { Component, StrictMode } from 'react';
import { Button } from 'antd-mobile';
// import { to } from 'await-to-js';

// import Http from './service/http';

class App extends Component {
  state = {
    name: 'App'
  };

  componentDidMount() {

  }

  onFetchData = async () => {
  }

  render() {
    const { name } = this.state;

    return (
      <StrictMode>
        <div>
          Hello wrold{name}
          <Button type="primary" size="large" onClick={this.onFetchData}>Primary</Button>
        </div>
      </StrictMode>
    );
  }
}

export default hot(App);
