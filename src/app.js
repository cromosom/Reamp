import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import store from './store.js';
import axios from 'axios';

import WidgetList from './components/WidgetList.js';

require('./styles/all.scss');

const dummyData = [
  {
    id : 1,
    name : 'First Widget'
  },
  {
    id: 2,
    name : 'Second Widget'
  }
]

render (
  <Provider store={store}>
    <WidgetList data={dummyData} />
  </Provider>,
  document.getElementById('app')
)
