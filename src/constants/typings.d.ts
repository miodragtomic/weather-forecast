export interface CountryCodesType {
  name: string;
  alpha2Code: string;
  flag: string;
  latlng: [number, number];
}

export interface TemperatureListItem {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  },
  weather: [{
    id: number;
    main: string;
    description: string;
    icon: string;
  }]
  weekday_name?: string;
}

export interface CityTemperaturesType {
  lat: number;
  lon: number;
  daily: Array<TemperatureListItem>;
}