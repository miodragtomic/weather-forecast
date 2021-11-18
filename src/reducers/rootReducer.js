import { combineReducers } from "redux";
import { weatherReducer } from "./weatherReducer";
import { countriesCodesReducer } from './countriesCodesReducer'

export const rootReducer = combineReducers({
  weather: weatherReducer,
  countriesCodes: countriesCodesReducer
});

