import { BackgroundGradient } from "../components/BackgroundGradient/BackgroundGradient";
import { InputsContainer } from '../components/InputsContainer'

export function WeatherForecast(props) {
  return (
    <BackgroundGradient>
      <div>Weather Forecast</div>
      <InputsContainer />
    </BackgroundGradient>
  );
}