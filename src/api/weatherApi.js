import { LOAD_ALL_COUNTRIES } from "../config/environment";
import { weatherService } from "../services.js/weatherService";
import { OPEN_API_KEY } from "../config/environment";
import { testCountryCodes, testWeatherCityTemperatures } from "../constants/testData"; 
import { COUNTRIES_CODES, NUMBER_OF_DAYS_TO_FETCH, ECONOMIC_API} from '../config/appSettings'

class WeatherApi {
  async fetchTenDaysForecase(countryCode, cityName, units = 'metric'){
    return (ECONOMIC_API
      ? fetch(`api.openweathermap.org/data/2.5/forecast/daily?q=${cityName},${countryCode}&cnt=${NUMBER_OF_DAYS_TO_FETCH}&appid=${OPEN_API_KEY}&units=${units}`)
        .then( result => result.join() )
      : Promise.resolve(testCountryCodes)
    )
    .then( weatherService.extractCountriesFromResponse )
      
  }

  async fetchTownsCode(){
    if(ECONOMIC_API){
      return Promise.resolve(testWeatherCityTemperatures)
        .then( weatherService.extractCountriesFromResponse);
    }

    return (LOAD_ALL_COUNTRIES
      ? fetch('https://restcountries.com/v2/all')
      : fetch(`https://restcountries.com/v2/alpha?codes=${COUNTRIES_CODES.join(',')}`)
    )
    .then( result => result.json())
    .then( weatherService.extractCountriesFromResponse )    
  }
}

 export const weatherApi = new WeatherApi();