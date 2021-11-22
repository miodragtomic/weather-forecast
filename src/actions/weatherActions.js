import { weatherApi } from "../api/weatherApi";
import { OPEN_WEATHER_API_FREE_USER } from "../config/appSettings";
import { DEBUG_THROW_ERROR } from "../config/environment";
import { gradientService } from "../services/gradientService";
import { weatherService } from "../services/weatherService";
import { ECONOMIC_WEATHER_API } from '../config/environment';

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
        const { selectedCountryCode } = ECONOMIC_WEATHER_API ?  { selectedCountryCode: 'RS'} : getState().countriesCodes;
        
        if( selectedCountryCode == null) throw new Error("Please select country code");

        let cityTemperatures;
        if(OPEN_WEATHER_API_FREE_USER){
          const { countriesCodes } = getState().countriesCodes;

          const [lat, lng] = countriesCodes.find( ccEntry => ccEntry.alpha2Code === selectedCountryCode).latlng;
          cityTemperatures = await weatherApi.fetchSevenDaysForecast(lat, lng);

        }else {
          cityTemperatures = await weatherApi.fetchTenDaysForecast(selectedCountryCode, cityName);
        }
        
        const tenDaysAverageTemp = weatherService.calulateAverageSevenOrTenDaysTemperature(cityTemperatures);
        const tenDaysAverageWeather = await weatherService.findClosestWeather(
          weatherService.getCityWeatherList(cityTemperatures),
          tenDaysAverageTemp
        );
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
        if( DEBUG_THROW_ERROR) throw error;  
      }
    }
  }    
}

export const weatherActions = new WeatherActions();