import { __ECONOMIC_API, __DEBUG_THROW_ERROR } from "./appSettings";

const isProduction = process.env === 'production'
export const LOAD_ALL_COUNTRIES = Boolean(process.env.REACT_APP_LOAD_ALL_COUNTRIES);
export const OPEN_API_KEY = process.env.REACT_APP_OPEN_API_KEY;
export const DEBUG_THROW_ERROR = process.env !== isProduction 
  ? __DEBUG_THROW_ERROR
  : false;

export const ECONOMIC_API = isProduction
  ? false
  : __ECONOMIC_API;