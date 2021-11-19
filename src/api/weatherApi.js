import { weatherService } from "../services/weatherService";
import { OPEN_API_KEY } from "../config/environment";
import { testWeatherCityTemperatures } from "../constants/testData"; 
import { NUMBER_OF_DAYS_TO_FETCH, ECONOMIC_API } from '../config/appSettings'

class WeatherApi {
  async fetchTenDaysForecase(countryCode, cityName, units = 'metric'){
    return (ECONOMIC_API
      ? fetch(`api.openweathermap.org/data/2.5/forecast/daily?q=${cityName},${countryCode}&cnt=${NUMBER_OF_DAYS_TO_FETCH}&appid=${OPEN_API_KEY}&units=${units}`)
        .then( result => result.json() )
      : Promise.resolve(testWeatherCityTemperatures)
    )
    .then( weatherService.extractCityTemperaturesFromResponse )      
  }
}

 export const weatherApi = new WeatherApi();