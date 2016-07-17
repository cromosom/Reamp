const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null
}

export default function reducer (state=initialState, action) {
  switch (action.type) {
    case 'INC_TRACK' : {
      return {...state, trackId: trackId++}
      break;
    }
  }
  return state;
}
