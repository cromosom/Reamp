const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null,
  contexts: [],
  trackId: 0 
}

export default (state=initialState, action) => {
  switch (action.type) {

    case 'FETCH_DATA_ERROR' : {
      return {...state, fetching: false, error: action.data}
      break;
    }
    case 'RECIVE_DATA' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.data
      }
      break;
    }
    case 'CREATE_AUDIOCONTEXTS' : {
      state.contexts.push({
        context : action.audioNode.context,
        src : action.audioNode.src,
        item : action.audioNode.item
      })
      return {
        ...state
      }
      break;
    }
    case 'SET_TRACK' : {
      return {
        ...state,
        trackId: action.id
      }
      break;
    }
    case 'INC_TRACK' : {
      return {...state, trackId: action.id}
      break;
    }
  }
  return state;
}
