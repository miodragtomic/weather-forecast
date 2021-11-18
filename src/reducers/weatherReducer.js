import { DEFAULT_GRADIENT_POINTS} from "../services.js/gradientService";
import { DEFAULT_TEMPERATURE } from "../config/appSettings";
import { 
  FETCH_TEN_DAYS_FORECAST_PENDING, 
  FETCH_TEN_DAYS_FORECAST_FULFILLED,
  FETCH_TEN_DAYS_FORECAST_REJECTED } from '../actions/weatherActions';

const initial = {
  loading: false,
  gradientPoints: [...DEFAULT_GRADIENT_POINTS],
  cityTemperatures: {},
  tenDaysAverageTemp: DEFAULT_TEMPERATURE,
  errorMessage: ""
};

export function weatherReducer(state = initial, action){
  switch(action.type){
    case FETCH_TEN_DAYS_FORECAST_PENDING: {
      return {
        ...state,
        loading: true,
      }
    }

    case FETCH_TEN_DAYS_FORECAST_FULFILLED: {
      return {
        ...state,
        loading: false,
        cityTemperatures: action.payload.cityTemperatures,
        tenDaysAverageTemp: action.payload.tenDaysAverageTemp,
        gradientPoints: action.payload.gradientPoints
      }
    }

    case FETCH_TEN_DAYS_FORECAST_REJECTED: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      }
    }

    default: return state;
  }  
}