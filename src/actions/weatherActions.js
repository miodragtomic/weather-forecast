import { weatherApi } from "../api/weatherApi";
import { gradientService } from "../services.js/gradientService";
import { weatherService } from "../services.js/weatherService";

export const FETCH_TEN_DAYS_FORECAST_PENDING = 'FETCH_TEN_DAYS_FORECAST_PENDING'
export const FETCH_TEN_DAYS_FORECAST_FULFILLED = 'FETCH_TEN_DAYS_FORECAST_FULFILLED'
export const FETCH_TEN_DAYS_FORECAST_REJECTED = 'FETCH_TEN_DAYS_FORECAST_REJECTED'


class WeatherActions {
  constructor(){    
    this._startFetchingTenDaysForecast = this._startFetchingTenDaysForecast.bind(this);
    this.fetchTenDaysForecast = this.fetchTenDaysForecast.bind(this);
    this._storeTenDaysForecase = this._storeTenDaysForecast.bind(this);
    this._errorTenDaysForecase = this._errorTenDaysForecast.bind(this);
  }

  _startFetchingTenDaysForecast(){
    return {
      type: FETCH_TEN_DAYS_FORECAST_PENDING
    }
  }

  _storeTenDaysForecast(result){
    return {
      type: FETCH_TEN_DAYS_FORECAST_FULFILLED,
      payload: result
    }
  }

  _errorTenDaysForecast(message){
    return {
      type: FETCH_TEN_DAYS_FORECAST_REJECTED,
      payload: message
    }
  }

  fetchTenDaysForecast(){
    return async (dispatch) => {
      dispatch( this._startFetchingTenDaysForecast() );    
      try {
        const cityTemperatures = await weatherApi.fetchTenDaysForecase();
        const tenDaysAverageTemp = weatherService.calulateAverageTenDaysTemperature(cityTemperatures);
        const gradientPoints = gradientService.calculateGradientPoints(tenDaysAverageTemp);

        const weatherReduxObj = {
          cityTemperatures,
          tenDaysAverageTemp,
          gradientPoints
        }

        dispatch( this._storeTenDaysForecast(weatherReduxObj) );
      }catch(error){
        dispatch( this._errorTenDaysForecast(error.message));
      }
    }
  }    
}

export const weatherActions = new WeatherActions();