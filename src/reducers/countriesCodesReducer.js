import {
  FETCH_COUNTRIES_CODES_PENDING,
  FETCH_COUNTRIES_CODES_FULFILLED,
  FETCH_COUNTRIES_CODES_REJECTED,
  SET_SELECTED_COUNTRY_CODE
} from '../actions/countriesCodesActions'

const initialState = {
  loading: false,
  countriesCodes: [],
  errorMessage: "",
  selectedCountryCode: null
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

    case SET_SELECTED_COUNTRY_CODE: {
      return {
        ...state,
        selectedCountryCode: action.payload
      }
    }

    default: return state;
  }
}