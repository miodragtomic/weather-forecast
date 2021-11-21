import { BackgroundGradient } from "../components/BackgroundGradient/BackgroundGradient";
import { InputsContainer } from '../components/InputsContainer';
import { MainContainer } from '../components/MainContainer';
import { WeekdaysContainer } from "../components/WeekdaysContainer";
import { TemperatureCard } from '../components/TemperatureCard';
import { useSelector } from "react-redux";
import styles from './WeatherForecast.module.css';

export function WeatherForecast(props) {
  const tenDaysAverageTemp = useSelector(store => store.weather.tenDaysAverageTemp);
  const initialState = useSelector(store => store.weather.initialState);

  const dateRange = "Decembar 4 - 10 2020"
  const renderTemperature = Math.round(tenDaysAverageTemp);
  
  return (
    <BackgroundGradient>      
      <MainContainer>
        <InputsContainer />
        { !initialState && (
        <div className={styles['averagetendays-temperaturecard-container']}>
          <TemperatureCard
            title={dateRange}
            temperature={renderTemperature}  
            size="large"                
          />
        </div>
        )}
        <WeekdaysContainer />
      </MainContainer>
    </BackgroundGradient>
  );
}