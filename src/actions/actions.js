import store from '../store.js';
import axios from 'axios';

export function fetchData () {
  return store.dispatch({type: 'RECIVE_DATA', data: files});
};

export function createAudioContexts (data) {
  return store.dispatch({type: 'CREATE_AUDIOCONTEXTS', audioNode: {
    context : data.context,
    src : data.src
  }});
};

export function selectTrack (trackId) {
  return store.dispatch({type: 'SELECT_TRACK', id : trackId});
};

export function skip (trackId) {
  return store.dispatch({type: 'INC_TRACK', id: trackId+1});
};

export function prev (trackId) {
  return store.dispatch({type: 'DEC_TRACK', id: trackId-1});
};
