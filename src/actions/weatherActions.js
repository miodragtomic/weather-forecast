import { weatherApi } from "../api/weatherApi";
import { gradientService } from "../services.js/gradientService";

export const FETCH_TEN_DAYS_FORECAST_PENDING = 'FETCH_TEN_DAYS_FORECAST_PENDING'
export const FETCH_TEN_DAYS_FORECAST_FULFILLED = 'FETCH_TEN_DAYS_FORECAST_FULFILLED'
export const FETCH_TEN_DAYS_FORECAST_REJECTED = 'FETCH_TEN_DAYS_FORECAST_REJECTED'


class WeatherActions {
  constructor(){    
    this._startFetchingTenDaysForecast = this._startFetchingTenDaysForecast.bind(this);
    this.fetchTenDaysForecast = this.fetchTenDaysForecast.bind(this);
    this._storeTenDaysForecase = this._storeTenDaysForecase.bind(this);
    this._errorTenDaysForecase = this._errorTenDaysForecase.bind(this);
  }

  _startFetchingTenDaysForecast(){
    return {
      type: FETCH_TEN_DAYS_FORECAST_PENDING
    }
  }

  _storeTenDaysForecase(result){
    return {
      type: FETCH_TEN_DAYS_FORECAST_FULFILLED,
      payload: result
    }
  }

  _errorTenDaysForecase(message){
    return {
      type: FETCH_TEN_DAYS_FORECAST_REJECTED,
      payload: message
    }
  }

  fetchTenDaysForecast(){
    return async (dispatch) => {
      dispatch( this._startFetchingTenDaysForecast() );    
      try {
        const apiResult = await weatherApi.fetchTenDaysForecase();
        //calulateGradient points service call
        //gradientService.calculateGradientPoints(temperature)
        dispatch( this._storeTenDaysForecase(apiResult) );
      }catch(error){
        dispatch( this._errorTenDaysForecase(error.message));
      }
    }
  }    
}

export const weatherActions = new WeatherActions();