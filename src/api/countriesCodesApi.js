import { LOAD_ALL_COUNTRIES } from "../config/environment";
import { countriesCodesService } from "../services/countiresCodesService";
import { testCountryCodes } from "../constants/testData"; 
import { COUNTRIES_CODES, ECONOMIC_API} from '../config/appSettings'

class CountriesCodesApi {
  async fetchTownsCodes(){
    if(ECONOMIC_API){
      return Promise.resolve(testCountryCodes)
        .then( countriesCodesService.extractCountriesFromResponse);
    }

    return (LOAD_ALL_COUNTRIES
      ? fetch('https://restcountries.com/v2/all')
      : fetch(`https://restcountries.com/v2/alpha?codes=${COUNTRIES_CODES.join(',')}`)
    )
    .then( result => result.json())
    .then( countriesCodesService.extractCountriesFromResponse )    
  }
}

export const countriesCodesApi = new CountriesCodesApi();