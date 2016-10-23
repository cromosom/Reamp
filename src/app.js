import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import store from './store.js';
import axios from 'axios';

import TrackList from './components/TrackList.js';
import Player from './components/Player.js';
import VisualCanvas from './components/VisualCanvas.js';

require('./styles/styles.scss');

render (
  <Provider store={store}>
    <div className="main">
      <TrackList />
      <Player />
      <VisualCanvas />
    </div>
  </Provider>,
  document.getElementById('app')
)
