import styles from './InputsContainer.module.css';
import { WeatherIcon } from "../WeatherIcon";
import { Select } from '../Select';
import { InputField } from "../InputField/InputField";
import { useSelector } from 'react-redux';
import { useMemo, useRef, useState } from 'react';
import { weatherService } from '../../services/weatherService';

const iconSelector = countryCodeObj => countryCodeObj.flag;
const descriptionSelector = countryCodeObj => countryCodeObj.name;
const valueSelector = coutnryCodeObj => coutnryCodeObj.alpha2Code;
const keySelector = valueSelector;
const titleSelector = valueSelector;

export function InputsContainer(props){
  const { 
    icon : weatherIcon, 
    description : weatherDescription 
  } = useSelector( store => store.weather.tenDaysAverageWeather);

  const {
    countriesCodes
  } = useSelector( store => store.countriesCodes);

  const [selectedCountryCode, setSelectedCountryCode] = useState({});
  const onCountryCodeChanged = ( countryCode ) => {
    setSelectedCountryCode(countryCode);
  }

  const weatherIconUrl = useMemo(() => 
    weatherService.generateWeatherIconUrl(weatherIcon), 
  [weatherIcon]);

  return (
    <div className={styles['inputs-container']}>
      <WeatherIcon
        src={weatherIconUrl}
        alt={weatherDescription}                    
      />
      <Select 
        value={selectedCountryCode}
        onChange={onCountryCodeChanged}
        
        iconSelector={iconSelector}
        descriptionSelector={descriptionSelector}                
        keySelector={keySelector}
        valueSelector={valueSelector}
        titleSelector={titleSelector}
      >
        {countriesCodes}
      </Select>
      <InputField
        placeholder="Please enter your location..."
      
      />
    </div>
  );
}