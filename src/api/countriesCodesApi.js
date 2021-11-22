import { ECONOMIC_CODES_API, LOAD_ALL_COUNTRIES } from "../config/environment";
import { countriesCodesService } from "../services/countriesCodesService";
import { testCountryCodes } from "../constants/testData"; 
import { COUNTRIES_CODES } from '../config/appSettings'

class CountriesCodesApi {
  async fetchTownsCodes(){
    return (LOAD_ALL_COUNTRIES
      ? fetch('https://restcountries.com/v2/all')
      : fetch(`https://restcountries.com/v2/alpha?codes=${COUNTRIES_CODES.join(',')}`)
    )
    .then( result => result.json())
    .then( countriesCodesService.extractCountriesFromResponse )    
  }

  async fetchCityGeocodes(countryName, cityName){
    const countryNameUrlEncoded = encodeURIComponent(countryName);
    const cityNameUrlEncoded = encodeURIComponent(cityName);
    return fetch(`https://nominatim.openstreetmap.org/search?city=${cityNameUrlEncoded}&country=${countryNameUrlEncoded}&format=json`)
      .then( result => result.json())
  }
}

class CountriesCodesEconomicApi extends CountriesCodesApi {
  async fetchTownsCodes(){    
    return Promise.resolve(testCountryCodes)
      .then( countriesCodesService.extractCountriesFromResponse);    
  }
}


export const countriesCodesApi = ECONOMIC_CODES_API
    ? new CountriesCodesEconomicApi()
    : new CountriesCodesApi();