import { hot } from 'react-hot-loader/root';
import React, { Component, StrictMode } from 'react';
import { Button } from 'antd-mobile';
import { to } from 'await-to-js';

import Http from './service/http';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'aPP'
    };
    this.onFetchData = this.onFetchData.bind(this);
  }

  componentDidMount() {

  }

  onFetchData = async () => {
    console.log('fetch');
    const [err, data] = await to(Http.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/register',
      data: {}
    }));
    if (err) return;
    console.log(data);
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
