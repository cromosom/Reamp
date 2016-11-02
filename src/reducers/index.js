const initialState = {
  data: [],
  contexts: [],
  trackId: 0
}

export default (state=initialState, action) => {
  switch (action.type) {

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
  }
  return state;
}
