import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: 'this is Login'
  };

  render() {
    const { name } = this.state;

    return <div>{name}</div>;
  }
}
