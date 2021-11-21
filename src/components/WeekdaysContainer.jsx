import styles from './WeekdaysContainer.module.css';
import { useSelector } from 'react-redux'
import { weatherService } from '../services/weatherService';
import { TemperatureCard } from './TemperatureCard';
import take from 'lodash/take'

export function WeekdaysContainer(props) {
  const weatherCityTemperatures = useSelector( store => store.weather.cityTemperatures);
  const temperatureList = weatherService.getCityWeatherList(weatherCityTemperatures);

  const renderTemperatureList = temperatureList != null
    ? take(temperatureList, 7)
    : []
  
  return (
    <div className={styles['weekdays-container']}>
      {
        renderTemperatureList.map( cityOneDayTemp => (
          <TemperatureCard
            key={cityOneDayTemp.weekday_name} 
            title={cityOneDayTemp.weekday_name}
            temperature={cityOneDayTemp.temp.day_rounded}
          />
        ))
      }
    </div>
  );
}