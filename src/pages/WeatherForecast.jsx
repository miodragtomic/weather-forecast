import { BackgroundGradient } from "../components/BackgroundGradient/BackgroundGradient";
import { InputsContainer } from '../components/InputsContainer';
import { MainContainer } from '../components/MainContainer';
import { WeekdaysContainer } from "../components/WeekdaysContainer";

export function WeatherForecast(props) {
  return (
    <BackgroundGradient>
      <div>Weather Forecast</div>
      <MainContainer>
        <InputsContainer />
        <WeekdaysContainer />
      </MainContainer>
    </BackgroundGradient>
  );
}