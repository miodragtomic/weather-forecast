import {
  FETCH_COUNTRIES_CODES_PENDING,
  FETCH_COUNTRIES_CODES_FULFILLED,
  FETCH_COUNTRIES_CODES_REJECTED
} from '../actions/countriesCodesActions'

const initialState = {
  loading: false,
  countriesCodes: [],
  errorMessage: ""
}

export function countriesCodesReducer(state = initialState, action){
  switch(action.type){
    case FETCH_COUNTRIES_CODES_PENDING: {
      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_COUNTRIES_CODES_FULFILLED: {
      return {
        ...state, 
        loading: false,
        countriesCodes: action.payload
      };
    }

    case FETCH_COUNTRIES_CODES_REJECTED: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      }      
    }      

    default: return state;
  }
}