import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import store from './store.js';
import axios from 'axios';

import Main from './containers/main.js';

require('./styles/styles.scss');

render (
  <Provider store={store}>
    <div className="main">
      <Main />
    </div>
  </Provider>,
  document.getElementById('app')
)
