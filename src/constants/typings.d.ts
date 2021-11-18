export interface CountryCodesType {
  name: string;
  alpha2Code: string;
  flag: string;
}

export interface TemperatureListItem {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  },
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;

  }
}

export interface CityTemperaturesType {
  city: {
    id: number;
    name: string;
    country: string;
  },
  list: Array<TemperatureListItem>;
}