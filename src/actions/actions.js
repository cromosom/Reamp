import store from '../store.js';

//fetch playlist
export function fetchData () {
  return store.dispatch({type: 'RECIVE_DATA', data: files});
};

//creats object with audio data
export function createAudioData (data) {
  return store.dispatch({type: 'CREATE_AUDIOCONTEXTS', audioNode: {
    context : data.context,
    src : data.src,
    item : data.item
  }});
};

//sets curr track
export function setCurrTrack (trackId) {
  return store.dispatch({type: 'SET_TRACK', id: trackId});
};
