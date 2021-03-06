import pick from 'lodash/pick';
import { pick as fp_pick, map as fp_map, sortBy as fp_sortBy, reduce as fp_reduce, flow, head} from 'lodash/fp';
//import { CountryCodesType, CityTemperaturesType, TemperatureListItem } from '../constants/typings';
import { NUMBER_OF_DAYS_TO_FETCH, OPEN_WEATHER_API_FREE_USER } from '../config/appSettings'
import addDays from 'date-fns/addDays';
import getDate from 'date-fns/getDate';
import getYear from 'date-fns/getYear';

class WeatherServiceSevenDays {
  constructor(){    
    this.extractCityTemperaturesFromResponse = this.extractCityTemperaturesFromResponse.bind(this);    
    this.findClosestWeather = this.findClosestWeather.bind(this);
    this.calulateAverageTenDaysTemperature = this.calulateAverageSevenOrTenDaysTemperature.bind(this);
    this.generateWeatherIconUrl = this.generateWeatherIconUrl.bind(this); 
    this.getCityWeatherList = this.getCityWeatherList.bind(this);
    this.generateDateRangeString = this.generateDateRangeString.bind(this);

    this._extractSingleTemperatureFromTemperatureObject = this._extractSingleTemperatureFromTemperatureObject.bind(this);
    this._extractTemperaturesFromTemperatresList = this._extractTemperaturesFromTemperatresList.bind(this);
    this._getWeekdayName = this._getWeekdayName.bind(this);       
  }

  extractCityTemperaturesFromResponse( cityTemperatureResponse){    
    const that = this;
    return flow(
      fp_map( fp_pick(['lat','lon', 'daily']) ),
      fp_map( cityTemp => ({
        ...cityTemp,
        daily: (cityTemp.daily && that._extractTemperaturesFromTemperatresList(cityTemp.daily))  || []
       }) 
      )
    )
    (Array.isArray(cityTemperatureResponse)
      ? cityTemperatureResponse
      : [cityTemperatureResponse]
    ).shift();
  }

  _getWeekdayName(seconds){
    return new Date(seconds * 1000).toLocaleDateString('default', { weekday: 'long'} );
  }  

  _extractSingleTemperatureFromTemperatureObject( temperatureObject){
    const singleTempObj = pick(temperatureObject, ['dt','temp.day', 'temp.min', 'temp.max', 'weather'])

    return {
      ...singleTempObj,
      weekday_name : this._getWeekdayName(singleTempObj.dt),
      temp: {
        ...singleTempObj.temp,
        day_rounded: Math.round(singleTempObj.temp.day)
      }      
    };
  }

  _extractTemperaturesFromTemperatresList( temperaturesList) {
    return Array.isArray(temperaturesList)
      ? temperaturesList.map( this._extractSingleTemperatureFromTemperatureObject)
      : this._extractSingleTemperatureFromTemperatureObject( temperaturesList)
  }
  
  /** @type { ( cityTemperatures: CityTemperaturesType ) => number } */
  calulateAverageSevenOrTenDaysTemperature( cityTemperatures){
    const { daily : temperaturesList } = cityTemperatures;    

    return temperaturesList
      .reduce( (acc, nextListItem) => acc + nextListItem.temp.day, 0) / NUMBER_OF_DAYS_TO_FETCH;
  }

  /** @type { ( temperaturesList: CityTemperaturesType['list']) => Promise<CityTemperaturesType['list'][0]['weather']> } */
  async findClosestWeather( temperaturesList, targetTemperature) {    
    const weatherArray = flow(
      fp_map(fp_pick(["temp", "weather"])),      
      fp_reduce((acc, next) => {
        if(acc == null){
          return next;
        }
        
        return Math.abs(targetTemperature - next.temp.day) < Math.abs(targetTemperature - acc.temp.day)
          ? next
          : acc
      }, null),
      
    )(temperaturesList).weather;
    
    return head(weatherArray);
  }

  generateWeatherIconUrl(iconSymbolicName){
    return `http://openweathermap.org/img/wn/${iconSymbolicName}@2x.png`
  }

  getCityWeatherList(cityTemperatures){
    return OPEN_WEATHER_API_FREE_USER
      ? cityTemperatures.daily
      : cityTemperatures.list
  }

  generateDateRangeString(){
    const startDate = new Date();
    const endDate = addDays(startDate, NUMBER_OF_DAYS_TO_FETCH - 1);

    const monthName = startDate.toLocaleDateString('defaault', { month: 'long'})
    const dayStartDate = getDate(startDate);
    const dayEndDate = getDate(endDate);
    const yearStartDate = getYear(startDate)
    
    return `${monthName} ${dayStartDate} - ${dayEndDate} ${yearStartDate}`;
  }
}


class WeatherServiceTenDays extends WeatherServiceSevenDays{
  constructor(){    
    super();
    this.extractCityTemperaturesFromResponse = this.extractCityTemperaturesFromResponse.bind(this);           
    this.calulateAverageSevenOrTenDaysTemperature = this.calulateAverageSevenOrTenDaysTemperature.bind(this);
  }

  extractCityTemperaturesFromResponse( cityTemperatureResponse){    
    const that = this;
    return flow(
      fp_map( fp_pick(['city.id','city.name', 'city.country', 'list']) ),
      fp_map( cityTemp => ({
        ...cityTemp,
        list: (cityTemp.list && that._extractTemperaturesFromTemperatresList(cityTemp.list))  || []
       }) 
      )
    )
    (Array.isArray(cityTemperatureResponse)
      ? cityTemperatureResponse
      : [cityTemperatureResponse]
    ).shift();
  }  

  calulateAverageSevenOrTenDaysTemperature( cityTemperatures){
    const { list : temperaturesList } = cityTemperatures;    

    return temperaturesList
      .reduce( (acc, nextListItem) => acc + nextListItem.temp.day, 0) / NUMBER_OF_DAYS_TO_FETCH;
  }

}

export const weatherService = OPEN_WEATHER_API_FREE_USER 
  ? new WeatherServiceSevenDays()
  : new WeatherServiceTenDays()