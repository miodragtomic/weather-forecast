import pick from 'lodash/pick';
import { pick as fp_pick, map as fp_map, flow} from 'lodash/fp';

class WeatherService {
  constructor(){
    this.extractCityTemperaturesFromResponse = this.extractCityTemperaturesFromResponse.bind(this);
    this.extractCountriesFromResponse = this.extractCountriesFromResponse.bind(this);    
  }

  _extractSingleCountryFromResponse( countryResponse ){
    return pick(countryResponse, ['name', 'alpha2Code', 'flag']);
  }

  extractCountriesFromResponse( countriesResponse ){
    return Array.isArray(countriesResponse)
      ? countriesResponse.map( this._extractSingleCountryFromResponse)
      : this._extractSingleCountryFromResponse( countriesResponse);
  }

  _extractSingleTemperatureFromTemperatureResponse( temperatureResponse){
    return pick( temperatureResponse, )
  }

  extractCityTemperaturesFromResponse( cityTemperatureResponse){    
    return flow(
      fp_map( fp_pick(['city.name', 'city.country']) ),
      fp_map( cityTemp => (cityTemp.list && this._extractTemperaturesFromTemperatresList(cityTemp.list)) || [])
    )
    (Array.isArray(cityTemperatureResponse)
      ? cityTemperatureResponse
      : [cityTemperatureResponse]
    ).shift();
  }

  _extractSingleTemperatureFromTemperatureObject( temperatureList){
    return pick(temperatureList, ['dt','temp.day', 'temp.min', 'temp.max'])
  }

  _extractTemperaturesFromTemperatresList( temperaturesList) {
    return Array.isArray(temperaturesList)
      ? temperaturesList.map( this._extractSingleTemperatureFromTemperatureObject)
      : this._extractSingleTemperatureFromTemperatureObject( temperaturesList)
  }
}

export const weatherService = new WeatherService();