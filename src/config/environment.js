import { __ECONOMIC_WEATHER_API, __DEBUG_THROW_ERROR, __ECONOMIC_CODES_API, __LOAD_ALL_COUNTRIES } from "./appSettings";

const isProduction = process.env === 'production'
export const LOAD_ALL_COUNTRIES = isProduction
  ? true
  : __LOAD_ALL_COUNTRIES;

export const OPEN_API_KEY = process.env.REACT_APP_OPEN_API_KEY;
export const DEBUG_THROW_ERROR = process.env !== isProduction 
  ? __DEBUG_THROW_ERROR
  : false;

export const ECONOMIC_WEATHER_API = isProduction
  ? false
  : __ECONOMIC_WEATHER_API;

export const ECONOMIC_CODES_API = isProduction
  ? false
  : __ECONOMIC_CODES_API;

  console.log(process.env.REACT_APP_LOAD_ALL_COUNTRIES);