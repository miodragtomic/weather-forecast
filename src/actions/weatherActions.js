import { weatherApi } from "../api/weatherApi";
import { ECONOMIC_API } from "../config/appSettings";
import { gradientService } from "../services/gradientService";
import { weatherService } from "../services/weatherService";

export const FETCH_TEN_DAYS_FORECAST_PENDING = 'FETCH_TEN_DAYS_FORECAST_PENDING'
export const FETCH_TEN_DAYS_FORECAST_FULFILLED = 'FETCH_TEN_DAYS_FORECAST_FULFILLED'
export const FETCH_TEN_DAYS_FORECAST_REJECTED = 'FETCH_TEN_DAYS_FORECAST_REJECTED'


class WeatherActions {
  constructor(){        
    this.fetchTenDaysForecast = this.fetchTenDaysForecast.bind(this);
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

  fetchTenDaysForecast(cityName){
    return async (dispatch, getState) => {
      dispatch( this._startFetchingTenDaysForecast() );    
      try {        
        const { selectedCountryCode } = ECONOMIC_API ?  { selectedCountryCode: 'RS'} : getState().countriesCodes;
        
        if( selectedCountryCode == null) throw new Error("Please select country code");
        
        const cityTemperatures = await weatherApi.fetchTenDaysForecase(selectedCountryCode, cityName);
        const tenDaysAverageTemp = weatherService.calulateAverageTenDaysTemperature(cityTemperatures);
        const tenDaysAverageWeather = await weatherService.findClosestWeather(cityTemperatures.list, tenDaysAverageTemp);
        const gradientPoints = gradientService.calculateGradientPoints(tenDaysAverageTemp);

        const weatherReduxObj = {
          cityTemperatures,
          tenDaysAverageTemp,
          tenDaysAverageWeather,
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