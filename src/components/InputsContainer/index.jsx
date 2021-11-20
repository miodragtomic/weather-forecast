import styles from './InputsContainer.module.css';
import { WeatherIcon } from "../WeatherIcon";
import { InputField } from "../InputField/InputField";
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { weatherService } from '../../services/weatherService';
import { weatherActions }  from '../../actions/weatherActions';
import { countriesCodesActions } from '../../actions/countriesCodesActions'
import { useDispatch } from 'react-redux';
import { CountriesCodesSelect } from '../CountriesCodesSelect';

export function InputsContainer(props){
  const { 
    icon : weatherIcon, 
    description : weatherDescription 
  } = useSelector( store => store.weather.tenDaysAverageWeather);
  
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(countriesCodesActions.fetchCountiresCodes());
  }, []);
  
  const weatherIconUrl = useMemo(() => 
    weatherService.generateWeatherIconUrl(weatherIcon), 
  [weatherIcon]);

  const performQuery = (value) => {
    dispatch(weatherActions.fetchTenDaysForecast(value) );
  }
  

  return (
    <div className={styles['inputs-container']}>
      <WeatherIcon
        src={weatherIconUrl}
        alt={weatherDescription}                    
      />
      <CountriesCodesSelect />      
      <InputField
        placeholder="Please enter your location..."
        onSubmitValue={performQuery}      
      />
    </div>
  );
}