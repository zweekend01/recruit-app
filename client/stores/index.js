import { createStore } from 'redux';

const reducer = () => {};

const payloadState = {
  name: 'Hello world'
};

const store = createStore(reducer, payloadState);

export default store;
