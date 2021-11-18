import pick from 'lodash/pick';
import { pick as fp_pick, map as fp_map, sortBy as fp_sortBy, reduce as fp_reduce, flow} from 'lodash/fp';
import { CountryCodesType, CityTemperaturesType, TemperatureListItem } from '../constants/typings';
import { NUMBER_OF_DAYS_TO_FETCH } from '../config/appSettings'

class WeatherService {
  constructor(){
    this.extractCityTemperaturesFromResponse = this.extractCityTemperaturesFromResponse.bind(this);
    this.extractCountriesFromResponse = this.extractCountriesFromResponse.bind(this);   
    this.findClosestWeather = this.findClosestWeather.bind(this); 
  }

  _extractSingleCountryFromResponse( countryResponse ){
    return pick(countryResponse, ['name', 'alpha2Code', 'flag']);
  }

  extractCountriesFromResponse( countriesResponse ){
    return Array.isArray(countriesResponse)
      ? countriesResponse.map( this._extractSingleCountryFromResponse)
      : this._extractSingleCountryFromResponse( countriesResponse);
  }

  extractCityTemperaturesFromResponse( cityTemperatureResponse){    
    return flow(
      fp_map( fp_pick(['city.id','city.name', 'city.country', 'list']) ),
      fp_map( cityTemp => ({
        ...cityTemp,
        list: (cityTemp.list && this._extractTemperaturesFromTemperatresList(cityTemp.list))  || []
       }) 
      )
    )
    (Array.isArray(cityTemperatureResponse)
      ? cityTemperatureResponse
      : [cityTemperatureResponse]
    ).shift();
  }

  _extractSingleTemperatureFromTemperatureObject( temperatureObject){
    const singleTempObj = pick(temperatureObject, ['dt','temp.day', 'temp.min', 'temp.max', 'weather'])

    return {
      ...singleTempObj,
      month_name : this._getMonthName(singleTempObj.dt)
    };
  }

  _extractTemperaturesFromTemperatresList( temperaturesList) {
    return Array.isArray(temperaturesList)
      ? temperaturesList.map( this._extractSingleTemperatureFromTemperatureObject)
      : this._extractSingleTemperatureFromTemperatureObject( temperaturesList)
  }
  
  /** @type { ( cityTemperatures: CityTemperaturesType ) => number } */
  calulateAverageTenDaysTemperature( cityTemperatures){
    const { list : temperaturesList } = cityTemperatures;    

    return temperaturesList
      .reduce( (acc, nextListItem) => acc + nextListItem.temp.day, 0) / NUMBER_OF_DAYS_TO_FETCH;
  }

  _getMonthName(seconds){
    return new Date(seconds * 1000).toLocaleDateString('sr-Latn-RS', { month: 'long'});
  }  

  /** @type { ( temperaturesList: CityTemperaturesType['list']) => Promise<CityTemperaturesType['list'][0]['weather']> } */
  async findClosestWeather( temperaturesList, targetTemperature) {    
    return flow(
      fp_map(fp_pick(["temp", "weather"])),      
      fp_reduce((acc, next) => {
        if(acc == null){
          return next;
        }
        
        return Math.abs(targetTemperature - next.temp.day) < Math.abs(targetTemperature - acc.temp.day)
          ? next
          : acc
      }, null)

    )(temperaturesList).weather;
  }
}

export const weatherService = new WeatherService();