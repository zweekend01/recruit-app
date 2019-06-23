import React, { Component } from 'react';

export default class App extends Component {
  state = {
    name: 'App'
  };

  render() {
    const { name } = this.state;

    return (
      <div>This is {name}!</div>
    );
  }
}
