import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';
import App from './App';

const appStore = createStore(reducer);
const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={appStore}>
    <App/>
  </Provider>,
  app,
);
