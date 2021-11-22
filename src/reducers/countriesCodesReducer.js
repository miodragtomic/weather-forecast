import {
  FETCH_COUNTRIES_CODES_PENDING,
  FETCH_COUNTRIES_CODES_FULFILLED,
  FETCH_COUNTRIES_CODES_REJECTED,
  SET_SELECTED_COUNTRY_CODE,
  STORE_LAST_MATCHED_GEOCODE,
} from '../actions/countriesCodesActions'

const initialState = {
  loading: false,
  countriesCodes: [],
  errorMessage: "",
  selectedCountryCode: null,
  lastMatchedGeocode: {}  
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
        countriesCodes: action.payload,
        selectedCountryCode: state.selectedCountryCode == null && action.payload.length > 0 
          ? action.payload[0].alpha2Code
          : state.selectedCountryCode
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

    case STORE_LAST_MATCHED_GEOCODE: {
      return {
        ...state,
        lastMatchedGeocode: action.payload
      }
    }

    default: return state;
  }
}