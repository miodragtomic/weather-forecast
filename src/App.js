import { WeatherForecast } from './pages/WeatherForecast';
import { Provider as StoreProvider } from 'react-redux'
import { store } from './store';

function App(){
  return (
    <StoreProvider store={store}>
      <WeatherForecast />
    </StoreProvider>
  );
}

export default App;
