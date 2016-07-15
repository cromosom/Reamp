const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null
}

export default (state=initialState, action) => {
  switch (action.type) {
    case 'FETCH_GEODATA_START' : {
      return {...state, fetching: true}
      break;
    }
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
  }
  return state;
}
