import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import store from './store.js';
import axios from 'axios';

import TrackList from './components/TrackList.js';
import Player from './components/Player.js';

require('./styles/styles.scss');

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
    <div className="main">
      <TrackList data={dummyData} />
      <Player />
    </div>
  </Provider>,
  document.getElementById('app')
)
