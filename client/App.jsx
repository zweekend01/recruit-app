import { hot } from 'react-hot-loader/root';
import React, { Component, StrictMode } from 'react';
import { Button } from 'antd-mobile';

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
    console.log('asdas');
  }

  render() {
    const { name } = this.state;

    return (
      <StrictMode>
        <div>
          Hello wrold{name}
          <Button type="primary" size="large" onClick={this.onFetchData}>sPl</Button>
        </div>
      </StrictMode>
    );
  }
}

export default hot(App);
