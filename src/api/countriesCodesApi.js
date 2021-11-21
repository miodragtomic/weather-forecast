import { LOAD_ALL_COUNTRIES } from "../config/environment";
import { countriesCodesService } from "../services/countriesCodesService";
import { testCountryCodes } from "../constants/testData"; 
import { COUNTRIES_CODES } from '../config/appSettings'
import { ECONOMIC_API } from '../config/environment';

class CountriesCodesApi {
  async fetchTownsCodes(){
    return (LOAD_ALL_COUNTRIES
      ? fetch('https://restcountries.com/v2/all')
      : fetch(`https://restcountries.com/v2/alpha?codes=${COUNTRIES_CODES.join(',')}`)
    )
    .then( result => result.json())
    .then( countriesCodesService.extractCountriesFromResponse )    
  }
}

class CountriesCodesEconomicApi {
  async fetchTownsCodes(){
    if(ECONOMIC_API){
      return Promise.resolve(testCountryCodes)
        .then( countriesCodesService.extractCountriesFromResponse);
    }
  }
}


export const countriesCodesApi = ECONOMIC_API
    ? new CountriesCodesEconomicApi()
    : new CountriesCodesApi();