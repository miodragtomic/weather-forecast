import { weatherService } from "../services/weatherService";
import { OPEN_API_KEY } from "../config/environment";
import { testWeatherCityTemperatures } from "../constants/testData"; 
import { NUMBER_OF_DAYS_TO_FETCH, ECONOMIC_API } from '../config/appSettings'

class WeatherApi {
  /// 16 days weather api not available for free users, 7 days weather is max
  async fetchSevenDaysForecast(lat, lon, units = 'metric'){
    return (ECONOMIC_API
      ? Promise.resolve(testWeatherCityTemperatures)
      : fetch( `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&APPID=${OPEN_API_KEY}&units=${units}`)
        .then( result => result.json() )       
    )
    .then( weatherService.extractCityTemperaturesFromResponse )      
  }  

  /// Not available for free members
  async fetchTenDaysForecast(countryCode, cityName, units = 'metric'){
    return (ECONOMIC_API
      ? Promise.resolve(testWeatherCityTemperatures)
      : fetch( `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName},${countryCode}&cnt=${NUMBER_OF_DAYS_TO_FETCH}&appid=${OPEN_API_KEY}&units=${units}`)
        .then( result => result.json() )       
    )
    .then( weatherService.extractCityTemperaturesFromResponse )      
  }
}

 export const weatherApi = new WeatherApi();